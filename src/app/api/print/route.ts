import { NextRequest, NextResponse } from 'next/server';
import { printImage } from '@/lib/epson-print';

export async function POST(request: NextRequest) {
  try {
    // リクエストボディからデータを取得
    const body = await request.json();
    const { imageUrl, timestamp } = body;

    console.log('印刷リクエスト受信:', { imageUrl, timestamp });

    if (!imageUrl) {
      console.error('画像URL未指定エラー');
      return NextResponse.json(
        { success: false, message: '画像URLが指定されていません' },
        { status: 400 }
      );
    }

    // 画像URLの検証
    let validatedImageUrl;
    try {
      validatedImageUrl = new URL(imageUrl);
      
      // URLに余分なクエリパラメータが付いていないか確認
      if (validatedImageUrl.search && validatedImageUrl.search.includes('?t=') && validatedImageUrl.search.includes('&t=')) {
        // 重複したタイムスタンプパラメータを修正
        const baseUrl = imageUrl.split('?')[0];
        const timestamp = new Date().getTime();
        validatedImageUrl = new URL(`${baseUrl}?t=${timestamp}`);
      }
    } catch (error) {
      console.error('無効な画像URLフォーマット:', imageUrl, error);
      return NextResponse.json(
        { success: false, message: '無効な画像URLフォーマットです' },
        { status: 400 }
      );
    }

    // 最終的な画像URL
    const finalImageUrl = validatedImageUrl.toString();
    console.log('最終的な画像URL:', finalImageUrl);

    // 環境変数の確認
    const epsonEnv = {
      host: process.env.EPSON_HOST,
      clientId: process.env.EPSON_CLIENT_ID,
      secret: process.env.EPSON_CLIENT_SECRET,
      device: process.env.EPSON_DEVICE,
    };
    
    console.log('EPSON環境変数:', {
      host: epsonEnv.host ? '設定済み' : '未設定',
      clientId: epsonEnv.clientId ? '設定済み' : '未設定',
      secret: epsonEnv.secret ? '設定済み' : '未設定',
      device: epsonEnv.device ? '設定済み' : '未設定',
    });
    
    // 環境変数が設定されているか確認
    if (!epsonEnv.host || !epsonEnv.clientId || !epsonEnv.secret || !epsonEnv.device) {
      console.error('EPSON Connect API設定が不足しています');
      return NextResponse.json(
        { success: false, message: 'プリンター設定が不足しています。管理者に連絡してください。' },
        { status: 500 }
      );
    }

    // 印刷処理を実行
    console.log('印刷処理開始...');
    const result = await printImage(finalImageUrl);
    console.log('印刷処理結果:', result);

    if (result.success) {
      return NextResponse.json(
        { success: true, message: result.message },
        { status: 200 }
      );
    } else {
      // エラーメッセージをユーザーフレンドリーに変換
      let userMessage = result.message;
      if (result.message.includes('command_not_allowed')) {
        userMessage = 'プリンターコマンドが許可されていません。プリンターの設定を確認してください。';
      } else if (result.message.includes('400')) {
        userMessage = 'プリンターへのデータ送信に失敗しました。画像形式が対応していない可能性があります。';
      } else if (result.message.includes('405')) {
        userMessage = 'プリンターが現在このコマンドを受け付けていません。プリンターの状態を確認してください。';
      }
      
      return NextResponse.json(
        { success: false, message: userMessage },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('印刷APIエラー:', error);
    const errorMessage = error instanceof Error ? error.message : '印刷処理中に不明なエラーが発生しました';
    console.error('エラーメッセージ:', errorMessage);
    
    // エラーメッセージをユーザーフレンドリーに変換
    let userMessage = errorMessage;
    if (errorMessage.includes('command_not_allowed')) {
      userMessage = 'プリンターコマンドが許可されていません。プリンターの設定を確認してください。';
    } else if (errorMessage.includes('400')) {
      userMessage = 'プリンターへのデータ送信に失敗しました。画像形式が対応していない可能性があります。';
    } else if (errorMessage.includes('405')) {
      userMessage = 'プリンターが現在このコマンドを受け付けていません。プリンターの状態を確認してください。';
    }
    
    return NextResponse.json(
      { success: false, message: userMessage },
      { status: 500 }
    );
  }
} 