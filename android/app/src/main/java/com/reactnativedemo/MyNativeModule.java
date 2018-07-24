package com.reactnativedemo;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MyNativeModule extends ReactContextBaseJavaModule {
    private Context mContext;
    //构造方法
    public MyNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }
    @Override
    public String getName() {
        //MyNativeModule 需要此名字来调用该类方法
        return "MyNativeModule";
    }
    //函数不能有返回值,被调用的原生代码是异步的,原生代码执行结束之后只能通过回调函数发送消息给RN

    //rnCallNative为RN需要调用的方法
    @ReactMethod
    public void rnCallNative(String msg){
        //添加意图
        Intent intent = new Intent(mContext,PayActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        //bundle为需要传给PayActivity的加密签名
        Bundle bundle = new Bundle();
        bundle.putString("key",msg);
        intent.putExtras(bundle);
        //startActivity
        mContext.startActivity(intent,bundle);
    }

}
