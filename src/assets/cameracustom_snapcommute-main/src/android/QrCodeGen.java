package cordova.plugin.cameracustom;

import android.app.Activity;
import android.os.Build;
import android.os.Bundle;
import android.content.Context;
import android.net.Uri;

//package com.tuya.smart.android.demo.camera;

import android.graphics.Bitmap;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;
import android.util.Log;
import android.provider.Settings;
import android.provider.Settings.SettingNotFoundException;
import android.content.Intent;
import android.view.inputmethod.InputMethodManager;

import androidx.appcompat.app.AppCompatActivity;

import com.google.zxing.WriterException;
import com.tuya.smart.android.common.utils.L;
import com.tuya.smart.android.common.utils.WiFiUtil;
import com.dyfolite.R;
//import com.tuya.smart.android.demo.base.utils.ToastUtil;
import cordova.plugin.cameracustom.QRCodeUtil;
//import com.tuya.smart.android.demo.family.FamilyManager;
import com.tuya.smart.home.sdk.TuyaHomeSdk;
import com.tuya.smart.home.sdk.builder.TuyaCameraActivatorBuilder;
import com.tuya.smart.sdk.api.ITuyaActivatorGetToken;
import com.tuya.smart.sdk.api.ITuyaCameraDevActivator;
import com.tuya.smart.sdk.api.ITuyaSmartCameraActivatorListener;
import com.tuya.smart.sdk.bean.DeviceBean;



public class QrCodeGen extends Activity implements ITuyaSmartCameraActivatorListener {

    private String wifiSSId = "";
    private String token = "";
    private String wifiPwd = "Tuya.140616";
    private ImageView mIvQr;
    private LinearLayout mLlInputWifi,mLlQrCode,mLlProgressBar;
    private EditText mEtInputWifiSSid;
    private EditText mEtInputWifiPwd;
    private Button mBtnSave,mBtnBeeped;
    private String ssid;
    private boolean brightnessChanged = false;
    private int prevBrightness;
    private boolean autoBrightness=false;
    private Context context;

    private ITuyaCameraDevActivator mTuyaActivator;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.qr_code);
        context = getApplicationContext();
        mLlInputWifi = findViewById(R.id.ll_input_wifi);
        mLlQrCode=findViewById(R.id.show_qr_code);
        mLlProgressBar=findViewById(R.id.show_progress);
        mEtInputWifiSSid = findViewById(R.id.et_wifi_ssid);
        mEtInputWifiPwd = findViewById(R.id.et_wifi_pwd);
        mBtnSave = findViewById(R.id.btn_save);
        mBtnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                createQrcode();
            }
        });
        mBtnBeeped=findViewById(R.id.btn_confirm);
        mBtnBeeped.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                closeQrCode();
            }
        });
        mIvQr = findViewById(R.id.iv_qrcode);
        init();
    }

    private void init() {
        Bundle bundle = getIntent().getExtras();
        //deviceId = bundle.getString("deviceId");
        token = bundle.getString("token");
        ssid = bundle.getString("SSID");
        wifiSSId = WiFiUtil.getCurrentSSID(this);
        wifiSSId = mEtInputWifiSSid.getText().toString();
        Log.d("QR code", "ssid" + wifiSSId);


        // TuyaHomeSdk.getActivatorInstance().getActivatorToken(FamilyManager.getInstance().getCurrentHomeId(), new ITuyaActivatorGetToken() {
        //     @Override
        //     public void onSuccess(String s) {
        //         token = s;
        //     }

        //     @Override
        //     public void onFailure(String s, String s1) {
        //         L.e("QrCodeConfigActivity", s);
        //     }
        // });
        mEtInputWifiSSid.setText(ssid);
    }

    private void createQrcode() {
        if (TextUtils.isEmpty(token)) {
            Toast.makeText(this, "token is empty", Toast.LENGTH_SHORT).show();
            return;
        }
        wifiPwd = mEtInputWifiPwd.getText().toString();
        TuyaCameraActivatorBuilder builder = new TuyaCameraActivatorBuilder()
                .setToken(token).setPassword(wifiPwd).setSsid(ssid).setListener(this);
        mTuyaActivator = TuyaHomeSdk.getActivatorInstance().newCameraDevActivator(builder);
        mTuyaActivator.createQRCode();
        mTuyaActivator.start();
    }


    @Override
    public void onQRCodeSuccess(String s) {
        final Bitmap bitmap;
        try {
            bitmap = QRCodeUtil.createQRCode(s, 300);
            QrCodeGen.this.runOnUiThread(new Runnable() {
                @Override
                public void run() {


                    try {
                        brightnessChanged=false;
                        autoBrightness=false;
                        prevBrightness=Settings.System.getInt(context.getContentResolver(), Settings.System.SCREEN_BRIGHTNESS);
                        if ( prevBrightness < 250) {
                            if(Settings.System.canWrite(context)) {
                                brightnessChanged = true;
                                if (Settings.System.getInt(context.getContentResolver(), Settings.System.SCREEN_BRIGHTNESS_MODE) == Settings.System.SCREEN_BRIGHTNESS_MODE_AUTOMATIC) {
                                    autoBrightness = true;
                                    Settings.System.putInt(
                                            context.getContentResolver(),
                                            Settings.System.SCREEN_BRIGHTNESS_MODE,
                                            Settings.System.SCREEN_BRIGHTNESS_MODE_MANUAL
                                    );
                                }
                                Settings.System.putInt(
                                        context.getContentResolver(), Settings.System.SCREEN_BRIGHTNESS, 250
                                );
                            }
                            else{
                                Intent intent = new Intent(Settings.ACTION_MANAGE_WRITE_SETTINGS);
                                intent.setData(Uri.parse("package:" + getApplicationContext().getPackageName()));
                                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                                startActivityForResult(intent,100);
                            }
                        }
                    } catch (SettingNotFoundException e) {

                    }
                    mIvQr.setImageBitmap(bitmap);
                    mLlQrCode.setVisibility(View.VISIBLE);
                    //mIvQr.setVisibility(View.VISIBLE);
                    mLlInputWifi.setVisibility(View.GONE);
                    InputMethodManager imm = (InputMethodManager) getSystemService(Activity.INPUT_METHOD_SERVICE);
                    imm.toggleSoftInput(InputMethodManager.HIDE_IMPLICIT_ONLY, 0);
                }
            });
        } catch (WriterException e) {
            e.printStackTrace();
        }

    }

    @Override
    public void onError(String s, String s1) {
        Toast.makeText(this, s, Toast.LENGTH_SHORT).show();
        Toast.makeText(this, s1, Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onActiveSuccess(DeviceBean deviceBean) {
        Toast.makeText(this, "Configuration Success", Toast.LENGTH_SHORT).show();
        //ToastUtil.shortToast(QrCodeConfigActivity.this, " config success！");
        this.finish();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if(brightnessChanged){
            Settings.System.putInt(
                    context.getContentResolver(), Settings.System.SCREEN_BRIGHTNESS, prevBrightness
            );
            brightnessChanged=false;
        }
        if(autoBrightness){
            Settings.System.putInt(
                    context.getContentResolver(),
                    Settings.System.SCREEN_BRIGHTNESS_MODE,
                    Settings.System.SCREEN_BRIGHTNESS_MODE_AUTOMATIC
            );
            autoBrightness=false;
        }
        if (null != mTuyaActivator) {
            mTuyaActivator.stop();
            mTuyaActivator.onDestroy();
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        switch (requestCode){
            case 100:
                if(Settings.System.canWrite(context)) {
                    try {
                        brightnessChanged = true;
                        if (Settings.System.getInt(context.getContentResolver(), Settings.System.SCREEN_BRIGHTNESS_MODE) == Settings.System.SCREEN_BRIGHTNESS_MODE_AUTOMATIC) {
                            autoBrightness = true;
                            Settings.System.putInt(
                                    context.getContentResolver(),
                                    Settings.System.SCREEN_BRIGHTNESS_MODE,
                                    Settings.System.SCREEN_BRIGHTNESS_MODE_MANUAL
                            );
                        }
                        Settings.System.putInt(
                                context.getContentResolver(), Settings.System.SCREEN_BRIGHTNESS, 250
                        );
                    }catch (SettingNotFoundException e){
                        
                    }
                }else{
                    Toast.makeText(this, "As the screen is not bright the QR Code may not be scanned by the camera", Toast.LENGTH_SHORT).show();
                }
                break;
        }
    }
    private void closeQrCode(){
        if(brightnessChanged){
            Settings.System.putInt(
                    context.getContentResolver(), Settings.System.SCREEN_BRIGHTNESS, prevBrightness
            );
            brightnessChanged=false;
        }
        if(autoBrightness){
            Settings.System.putInt(
                    context.getContentResolver(),
                    Settings.System.SCREEN_BRIGHTNESS_MODE,
                    Settings.System.SCREEN_BRIGHTNESS_MODE_AUTOMATIC
            );
            autoBrightness=false;
        }
        mLlProgressBar.setVisibility(View.VISIBLE);
        mLlQrCode.setVisibility(View.GONE);
    }
}
