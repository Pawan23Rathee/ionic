package cordova.plugin.ttlockdata;

import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CallbackContext;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import com.ttlock.bl.sdk.api.ExtendedBluetoothDevice;
import com.ttlock.bl.sdk.entity.LockError;
import com.ttlock.bl.sdk.api.TTLockClient;
import com.ttlock.bl.sdk.callback.ScanLockCallback;
import com.ttlock.bl.sdk.callback.InitLockCallback;
import com.ttlock.bl.sdk.util.FeatureValueUtil;
import com.ttlock.bl.sdk.constant.FeatureValue;
import com.ttlock.bl.sdk.callback.SetNBServerCallback;
import org.apache.cordova.*;
import android.content.Context;
import android.util.Log;
import java.util.List;
import com.ttlock.bl.sdk.util.DigitUtil;
//import androidx.core.content.ContextCompat;
import android.Manifest;
import android.content.pm.PackageManager;
//import androidx.annotation.NonNull;
import com.ttlock.bl.sdk.constant.ControlAction;
import com.ttlock.bl.sdk.callback.ControlLockCallback;
import com.ttlock.bl.sdk.entity.ControlLockResult;

import com.ttlock.bl.sdk.callback.ResetLockCallback;
import com.ttlock.bl.sdk.callback.AddFingerprintCallback;
import com.ttlock.bl.sdk.callback.ClearAllFingerprintCallback;
import com.ttlock.bl.sdk.callback.GetAllValidFingerprintCallback;
import com.ttlock.bl.sdk.callback.DeleteFingerprintCallback;
import com.ttlock.bl.sdk.callback.ModifyFingerprintPeriodCallback;
import java.text.SimpleDateFormat;
import java.util.Locale;
import java.util.HashMap;
import com.ttlock.bl.sdk.callback.SetAutoLockingPeriodCallback;
import com.ttlock.bl.sdk.constant.LogType;
import com.ttlock.bl.sdk.gateway.model.WiFi;
import com.ttlock.bl.sdk.callback.GetOperationLogCallback;
import com.ttlock.bl.sdk.callback.ResetKeyCallback;
import com.ttlock.bl.sdk.callback.GetLockMuteModeStateCallback;
import com.ttlock.bl.sdk.callback.SetLockMuteModeCallback;
import com.ttlock.bl.sdk.callback.SetRemoteUnlockSwitchCallback;
import com.ttlock.bl.sdk.callback.GetRemoteUnlockStateCallback;
import com.ttlock.bl.sdk.callback.GetLockTimeCallback;
import com.ttlock.bl.sdk.callback.SetLockTimeCallback;
import com.ttlock.bl.sdk.callback.GetBatteryLevelCallback;
import com.ttlock.bl.sdk.callback.CreateCustomPasscodeCallback;
import com.ttlock.bl.sdk.callback.ModifyPasscodeCallback;
import com.ttlock.bl.sdk.callback.DeletePasscodeCallback;
import com.ttlock.bl.sdk.callback.GetAllValidPasscodeCallback;
import com.ttlock.bl.sdk.callback.GetPasscodeVerificationInfoCallback;
import com.ttlock.bl.sdk.callback.ResetPasscodeCallback;
import com.ttlock.bl.sdk.callback.ModifyAdminPasscodeCallback;
import com.ttlock.bl.sdk.callback.AddICCardCallback;
import com.ttlock.bl.sdk.callback.DeleteICCardCallback;
import com.ttlock.bl.sdk.callback.ModifyICCardPeriodCallback;
import com.ttlock.bl.sdk.callback.ClearAllICCardCallback;
import com.ttlock.bl.sdk.callback.GetAllValidICCardCallback;

import com.ttlock.bl.sdk.callback.GetPassageModeCallback;
import com.ttlock.bl.sdk.callback.SetPassageModeCallback;
import com.ttlock.bl.sdk.entity.PassageModeConfig;
import com.ttlock.bl.sdk.entity.PassageModeType;
import com.ttlock.bl.sdk.callback.ClearPassageModeCallback;
import com.ttlock.bl.sdk.callback.DeletePassageModeCallback;
import com.ttlock.bl.sdk.util.GsonUtil;
import com.ttlock.bl.sdk.gateway.api.GatewayClient;
import com.ttlock.bl.sdk.gateway.callback.ScanGatewayCallback;
import com.ttlock.bl.sdk.gateway.model.ConfigureGatewayInfo;
import com.ttlock.bl.sdk.gateway.model.DeviceInfo;
import com.ttlock.bl.sdk.gateway.callback.ConnectCallback;
import com.ttlock.bl.sdk.gateway.callback.InitGatewayCallback;
import com.ttlock.bl.sdk.gateway.callback.DfuCallback;
import com.ttlock.bl.sdk.gateway.api.GatewayDfuClient;
import com.ttlock.bl.sdk.gateway.model.GatewayError;
import com.ttlock.bl.sdk.gateway.callback.ScanWiFiByGatewayCallback;

//import ttlock.demo.DateUtils;
//import ttlock.demo.lock.adapter.LockListAdapter;
/**
 * This class echoes a string called from JavaScript.
 */
public class TTlockdata extends CordovaPlugin {
    public static TTlockdata instance = null;
    private  final String TAG = "TTLockData";
    public  CordovaWebView cordovaWebView;
   public CordovaInterface cordovaInterface;
   public ExtendedBluetoothDevice device1;
   public ExtendedBluetoothDevice deviceGateway;
   protected static final int REQUEST_PERMISSION_REQ_CODE=11;
   long addStartDate = 0;
    long addEndDate = 0;
    int totalCountLock;
    int currentCountLock;
    ConfigureGatewayInfo configureGatewayInfo=new ConfigureGatewayInfo();
    @Override
   public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if(action.equals("init")){
            Context context=this.cordova.getActivity().getApplicationContext();
            TTLockClient.getDefault().prepareBTService(context);
            callbackContext.success("lockdata no ans");
            // Log.d(TAG, " lockdata no ans ");
            return true;
       }
       else if(action.equals("lockscan")){
        startScan(callbackContext);
        return true;
       }
 else if(action.equals("lockdata")){
       initializeLock(callbackContext);
      
         return true;
    }
    else if(action.equals("lockUnlock")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String macAddress=args.getJSONObject(0).getString("macAddress");
        boolean status=Boolean.parseBoolean(args.getJSONObject(0).getString("status"));
    lockunlock(callbackContext,lockdata,macAddress,status);
      
         return true;
    }
    else if(action.equals("deleteLock")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        deleteLock(callbackContext,lockdata,lockMac);
        return true;
    }
    else if(action.equals("addFingerPrint")){
        String type=args.getJSONObject(0).getString("type");
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        addFingerPrint(callbackContext,type,lockdata,lockMac);
       return true;
    }
    else if(action.equals("getAllFingerPrint")){
        // type=args.getJSONObject(0).getString("type");
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        getAllFingerPrint(callbackContext,lockdata,lockMac);
       return true;
    }
    else if(action.equals("deleteFingerPrint")){
        String fingerprintNum=args.getJSONObject(0).getString("fingerPrintNum");
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        deleteFingerPrint(callbackContext,fingerprintNum,lockdata,lockMac);
       return true;
    }
    else if(action.equals("encryptpass")){
        //String fingerprintNum=args.getJSONObject(0).getString("fingerPrintNum");
        //String lockdata=args.getJSONObject(0).getString("lockdata");
        String password=args.getJSONObject(0).getString("password");
        encryptpass(callbackContext,password);
       return true;
    }
   else if(action.equals("clearFingerPrint")){
        //String type=args.getJSONObject(0).getString("type");
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        clearFingerPrint(callbackContext,lockdata,lockMac);
       return true;
    }
    else if(action.equals("modifyFingerPrintPeriod")){
        String fingerprintNum=args.getJSONObject(0).getString("fingerPrintNum");
        String startDate=args.getJSONObject(0).getString("startDate");
        String endDate=args.getJSONObject(0).getString("endDate");
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        modifyFingerPrintPeriod(callbackContext,fingerprintNum,startDate,endDate,lockdata,lockMac);
       return true;
    }
    else if(action.equals("autolockperiod")){
        // autolockPeriod(CallbackContext callbackContext, String lockData, String lockMac) 
         String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        autolockPeriod(callbackContext,lockdata,lockMac);
       return true;
    }
    else if(action.equals("getOperationLog")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
      getOperationLog(callbackContext,lockdata, lockMac);
      return true;
    }
    else if(action.equals("resetEKey")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        resetEKey(callbackContext,lockdata, lockMac);
      return true;
    }
    else if(action.equals("getAudioSwitchState")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        getAudioSwitchState(callbackContext,lockdata, lockMac);
      return true;
    }
    else if(action.equals("setAudioSwitchState")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        Boolean enable=Boolean.parseBoolean(args.getJSONObject(0).getString("enable"));  
        setAudioSwitchState(callbackContext,enable,lockdata, lockMac);
      return true;
    }
    else if(action.equals("setRemoteSwitchUnlock")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        Boolean enable=Boolean.parseBoolean(args.getJSONObject(0).getString("enable"));
        setRemoteSwitchUnlock(callbackContext,enable,lockdata, lockMac);
      return true;
    }
    else if(action.equals("getRemoteUnlockState")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        getRemoteUnlockState(callbackContext,lockdata, lockMac);
      return true;
    }
     else if(action.equals("setLockTime")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        long time= new Long(args.getJSONObject(0).getString("time"));
        setLockTime(callbackContext,time,lockdata, lockMac);
      return true;
    }
   
    else if(action.equals("getLockTime")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        getLockTime(callbackContext,lockdata, lockMac);
      return true;
    }
    else if(action.equals("getBatteryLevel")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        getBatteryLevel(callbackContext,lockdata, lockMac);
      return true;
    }
    else if(action.equals("createCustomPasscode")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        long startDate= new Long(args.getJSONObject(0).getString("startDate"));
        long endDate= new Long(args.getJSONObject(0).getString("endDate"));
        String passcode=args.getJSONObject(0).getString("passcode");
        createCustomPasscode(callbackContext,startDate, endDate, passcode, lockdata,lockMac);
      return true;
    }
    else if(action.equals("modifyPasscode")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        long newStartDate= new Long(args.getJSONObject(0).getString("startDate"));
        long newEndDate= new Long(args.getJSONObject(0).getString("endDate"));
        String originalPasscode=args.getJSONObject(0).getString("originalPasscode");
        String newPasscode=args.getJSONObject(0).getString("newPasscode");
        modifyPasscode(callbackContext,originalPasscode, newPasscode,newStartDate,newEndDate,lockdata,lockMac);
      return true;
    }
    else if(action.equals("deletePasscode")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        String passcode=args.getJSONObject(0).getString("passcode");
        deletePasscode(callbackContext,passcode, lockdata,lockMac);
      return true;
    }
    else if(action.equals("resetPasscode")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        resetPasscode(callbackContext,lockdata,lockMac);
      return true;
    }
    else if(action.equals("getAllValidPasscodes")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
      getAllValidPasscodes(callbackContext,lockdata, lockMac);
      return true;
    }
    else if(action.equals("modifyAdminPasscode")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        String newAdminPasscode=args.getJSONObject(0).getString("passcode");
        modifyAdminPasscode(callbackContext,newAdminPasscode,lockdata, lockMac);
      return true;
    }
    else if(action.equals("addICCard")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        addICCard(callbackContext,lockdata, lockMac);
      return true;
    }
    else if(action.equals("modifyICCardValidityPeriod")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        long newStartDate= new Long(args.getJSONObject(0).getString("endDate"));
        long newEndDate= new Long(args.getJSONObject(0).getString("endDate"));
        String cardNum=args.getJSONObject(0).getString("cardNum");
        modifyICCardValidityPeriod( callbackContext, newStartDate, newEndDate, cardNum, lockdata,lockMac);
      return true;
    }
    else if(action.equals("getAllValidCard")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        getAllValidCard(callbackContext, lockdata, lockMac);
      return true;
    }
    else if(action.equals("deleteICCard")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        String cardNum=args.getJSONObject(0).getString("cardNum");
        deleteICCard(callbackContext,cardNum, lockdata, lockMac);
      return true;
    }
    else if(action.equals("clearAllICCard")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        clearAllICCard( callbackContext,lockdata, lockMac);
      return true;
    }
    else if(action.equals("getPassageMode")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        getPassageMode(callbackContext, lockdata, lockMac);
      return true;
    }
    else if(action.equals("setPassageMode")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        setPassageMode(callbackContext, lockdata, lockMac);
      return true;
    }
    else if(action.equals("deletePassageMode")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        deletePassageMode( callbackContext, lockdata, lockMac);
      return true;
    }
    else if(action.equals("clearPassageMode")){
        String lockdata=args.getJSONObject(0).getString("lockdata");
        String lockMac=args.getJSONObject(0).getString("macAddress");
        clearPassageMode(callbackContext, lockdata, lockMac);
      return true;
    }
    else if(action.equals("scanGateway")){
        getScanGatewayCallback(callbackContext);
      return true;
    }
    else if(action.equals("connectGateway")){
        connectGateway(callbackContext);
      return true;
    }
    else if(action.equals("initgateway")){
        int uId=Integer.parseInt(args.getJSONObject(0).getString("uId"));
        String userPassword=args.getJSONObject(0).getString("UserPassword");
        String wifiName=args.getJSONObject(0).getString("SSID");
        String wifiPassword=args.getJSONObject(0).getString("wifiPass");
        initGateway(callbackContext,uId,userPassword,wifiName,wifiPassword);
      return true;
    }
    else if(action.equals("scanWifi")){
        scanWifi(callbackContext);
      return true;
    }
    else if(action.equals("startDfu")){
        String clientId=args.getJSONObject(0).getString("clientId");
        String accessToken=args.getJSONObject(0).getString("token");
        int gatewayId= Integer.parseInt(args.getJSONObject(0).getString("gatewayId"));
        String gatewayMac=args.getJSONObject(0).getString("gatewayMac");
        startDfu(callbackContext, clientId, accessToken, gatewayId,  gatewayMac);
      return true;
    }
       return false;
    } 



  public void startScan(CallbackContext callbackContext){
        TTLockClient.getDefault().startScanLock(new ScanLockCallback() {
            @Override
            public void onScanLockSuccess(ExtendedBluetoothDevice device) {
                device1=device;
                callbackContext.success("ld scan  "+device);
                // if(device != null) {
                //     if(device.isSettingMode()){
                //  device1=device;
                // callbackContext.success("ld scan  "+device);
                // Log.d(TAG, "ld data   "+device);
                //     }
                // }
            }
            @Override
            public void onFail(LockError error) {
                callbackContext.success("ld scan fail  "+error);
                Log.d(TAG, "ld data fail  "+error);
            }
        });
    }
     
  private void initializeLock(CallbackContext callbackContext) {
        // callbackContext.success("dyfosmart" + device1.isSettingMode());
        TTLockClient.getDefault().initLock(device1, new InitLockCallback() {
            @Override
            public void onInitLockSuccess(String lockData) {
                // if(device1 != null){
                if(device1.isSettingMode()){
            callbackContext.success(lockData);
           Log.d(TAG, "ld data   "+lockData);
           //activity = cordovaInterface.getActivity();
           //Toast.makeText(activity, "ld  Data .................."+lockData, Toast.LENGTH_LONG).show();
                }
            //   }
            }
            @Override
            public void onFail(LockError error) {  
                callbackContext.success("ld data fail "+error);
       Log.d(TAG, "ld data fail  "+error);             
            }
        });
    }

private void encryptpass(CallbackContext callbackContext,String password){
 String encPassword = DigitUtil.getMD5(password);
 callbackContext.success(encPassword);
}

public void lockunlock(CallbackContext callbackContext,String lockdata,String macAddress,boolean status){
     if(status==true){
         //ensureBluetoothIsEnabled();
        TTLockClient.getDefault().controlLock(ControlAction.LOCK,lockdata,macAddress,new ControlLockCallback() {
            @Override
            public void onControlLockSuccess(ControlLockResult controlLockResult) {
                //Toast.makeText(UnlockActivity.this,"lock is locked!",Toast.LENGTH_LONG).show();
            }

            @Override
            public void onFail(LockError error) {
               // Toast.makeText(UnlockActivity.this,"lock lock fail!--" + error.getDescription(),Toast.LENGTH_LONG).show();
            }
        });
     }
     else if(status==false){
      TTLockClient.getDefault().controlLock(ControlAction.UNLOCK,lockdata,macAddress, new ControlLockCallback() {
            @Override
            public void onControlLockSuccess(ControlLockResult controlLockResult) {
               // Toast.makeText(UnlockActivity.this,"lock is unlock  success!",Toast.LENGTH_LONG).show();
            }

            @Override
            public void onFail(LockError error) {
               // Toast.makeText(UnlockActivity.this,"unLock fail!--" + error.getDescription(),Toast.LENGTH_LONG).show();
            }
        });
     }
 }

public void deleteLock(CallbackContext callbackContext,String lockData,String lockMac){
TTLockClient.getDefault().resetLock(lockData,lockMac,new ResetLockCallback() {
    @Override
    public void onResetLockSuccess() {
         callbackContext.success("deleting Lock....");

        //makeToast("-lock is reset and now upload to  server -");
        //uploadResetLock2Server();
    }
 
    @Override
    public void onFail(LockError error) {
        //makeErrorToast(error);
        callbackContext.error("error while deleting lock");
    }
});

}

public void addFingerPrint(CallbackContext callbackContext,String type,String lockData,String lockMac){
    // switch (type){
    //         case PERMANENT:
    //             break;
    //         case TEMPORARY:
    //             addStartDate = System.currentTimeMillis();
    //             //means 2 minutes later this card will expired.
    //             addEndDate = addStartDate + 2 * 60 * 1000;
    //             break;
    //         default:
    //             break;
    //     }
  TTLockClient.getDefault().addFingerprint(addStartDate, addEndDate,lockData, lockMac, new AddFingerprintCallback() {

            @Override
            public void onEnterAddMode(int totalCount) {
                Log.d(TAG,"==put your fingerprint on lock=" + totalCount);
                //callbackContext.success(String.valueOf(totalCount));
                totalCountLock=totalCount;

            }

            @Override
            public void onCollectFingerprint(int currentCount) {
            Log.d(TAG,"==currentCount is " + currentCount);
              currentCountLock=currentCount;
            //callbackContext.success(String.valueOf(currentCount));
            }

            @Override
            public void onAddFingerpintFinished(long fingerprintNum) {
                //uploadFingerprint2Server(addStartDate,addEndDate,fingerprintNum);
                Log.d(TAG,"==fingerprintNum is " + fingerprintNum);
                // HashMap<String,String> params = new HashMap<>(3);
                try{
                JSONArray jsonArray = new JSONArray();
                  JSONObject dataForFingerPrint = new JSONObject();
              dataForFingerPrint.put("totalCount",String.valueOf(totalCountLock));
              dataForFingerPrint.put("currentCount",String.valueOf(currentCountLock));
              dataForFingerPrint.put("fingerprintNum",String.valueOf(fingerprintNum));
              jsonArray.put(dataForFingerPrint);
                // params.put("totalCount",String.valueOf(totalCountLock));
//params.put("currentCount",String.valueOf(currentCountLock));
                  // params.put("fingerprintNum",String.valueOf(fingerprintNum));
                callbackContext.success(jsonArray);
                }catch(JSONException e){}
            }

            @Override
            public void onFail(LockError error) {
                //makeErrorToast(error);
                callbackContext.error("fingerprint error   "+error);
            }
        });
}
 public void getAllFingerPrint(CallbackContext callbackContext,String lockdata,String lockMac){
    TTLockClient.getDefault().getAllValidFingerprints(lockdata, lockMac, new GetAllValidFingerprintCallback() {
            @Override
            public void onGetAllFingerprintsSuccess(String fingerprintStr) {
                //makeToast("-get-all fingerprints-success-" + fingerprintStr);
                Log.d(TAG,"-get-all fingerprints-success-" + fingerprintStr);
                callbackContext.success(fingerprintStr);
            }

            @Override
            public void onFail(LockError error) {
                //makeErrorToast(error);
                callbackContext.error("err"+error);
            }
        });
 }
 public void deleteFingerPrint(CallbackContext callbackContext,String fingerPrintNum,String lockdata,String lockMac){
     
 TTLockClient.getDefault().deleteFingerprint(fingerPrintNum,lockdata, lockMac, new DeleteFingerprintCallback() {
            @Override
            public void onDeleteFingerprintSuccess() {
                Log.d(TAG,"--fingerprint is deleted by lock-");
                callbackContext.success("deleted finger print");
                //this must be done
                //notifyDelete2Server();
            }

            @Override
            public void onFail(LockError error) {
                //makeErrorToast(error);
                callbackContext.error("err"+error);
            }
        });
 }
 public void  clearFingerPrint(CallbackContext callbackContext,String lockdata,String lockMac){
      TTLockClient.getDefault().clearAllFingerprints( lockdata,lockMac, new ClearAllFingerprintCallback() {

            @Override
            public void onClearAllFingerprintSuccess() {
                Log.d(TAG,"--clear all fingerprints-");
                callbackContext.success("clear fingerprint");
                //this must be done
                //uploadClear2Server();
            }

            @Override
            public void onFail(LockError error) {
                //makeErrorToast(error);
                callbackContext.error("err"+error);
            }
        });
 }
 public void  modifyFingerPrintPeriod(CallbackContext callbackContext,String fingerPrintNum,String startDate,String endDate,String lockdata,String lockMac){
      //long fingerprintNum=new Long(fingerPrintNum);
       long newStartDate=new Long(startDate);
        long newEndDate=new Long(endDate);
     TTLockClient.getDefault().modifyFingerprintValidityPeriod(newStartDate, newEndDate,fingerPrintNum, lockdata,lockMac, new ModifyFingerprintPeriodCallback() {

            @Override
            public void onModifyPeriodSuccess() {
                Log.d(TAG,"-modify success-");
                callbackContext.success("modify success");
                //call server api to update modify data
            }

            @Override
            public void onFail(LockError error) {
                callbackContext.error("err"+error);
            }
        }); 
 }

 public void autolockPeriod(CallbackContext callbackContext, String lockData, String lockMac){
   int time=5;  
  TTLockClient.getDefault().setAutomaticLockingPeriod(time,lockData, lockMac,new SetAutoLockingPeriodCallback() {
            @Override
            public void onSetAutoLockingPeriodSuccess() {
                // makeToast("set automatic locking period success");
                callbackContext.success("set automatic locking period success");
            }

            public void onFail(LockError error) {
                // makeErrorToast(error);
                callbackContext.error("err"+error);
            }
        });
}
public void getOperationLog(CallbackContext callbackContext, String lockdata, String lockMac){
     TTLockClient.getDefault().getOperationLog(LogType.ALL,lockdata,lockMac, new GetOperationLogCallback() {
            @Override
            public void onGetLogSuccess(String log) {
                callbackContext.success(log);
                Log.d(TAG,"GET log success");
            }

            @Override
            public void onFail(LockError error) {
                callbackContext.error("err"+error);
            }
        });
}
//reset EKey
public void resetEKey(CallbackContext callbackContext,String lockdata,String lockMac){
    TTLockClient.getDefault().resetEkey(lockdata,lockMac, new ResetKeyCallback() {
        @Override
        public void onResetKeySuccess(String lockData) {
            Log.d(TAG,"new lock Data"+lockData);
           callbackContext.success(lockData);
        }

        @Override
        public void onFail(LockError error) {
           callbackContext.error("err"+error);
        }
    });
}
//Get Audio Switch State
public void getAudioSwitchState(CallbackContext callbackContext, String lockdata, String lockMac){
    TTLockClient.getDefault().getMuteModeState( lockdata,lockMac, new GetLockMuteModeStateCallback() {
        @Override
        public void onGetMuteModeStateSuccess(boolean enabled) {
            Log.d(TAG,"Audio State"+enabled);
            callbackContext.success("audio state"+enabled);
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//Set Audio Switch State
public void setAudioSwitchState(CallbackContext callbackContext,Boolean enable, String lockdata,String lockMac){
    TTLockClient.getDefault().setMuteMode(enable,lockdata,lockMac,new SetLockMuteModeCallback() {
        @Override
        public void onSetMuteModeSuccess(boolean enabled) {
            Log.d(TAG,"--set lock mute state Success-is mute-" + enable);
            callbackContext.success("--set lock mute state Success-is mute-" + enable);
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//Set Remote Unlock Switch
public void setRemoteSwitchUnlock(CallbackContext callbackContext,Boolean enable, String lockdata,String lockMac){
    TTLockClient.getDefault().setRemoteUnlockSwitchState(enable,lockdata,lockMac,new SetRemoteUnlockSwitchCallback() {
        @Override
        public void onSetRemoteUnlockSwitchSuccess(String lockData) {
            Log.d(TAG,"remote unlock "+lockData );
            callbackContext.success(lockData);

        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//Get Remote Unlock Switch State
public void getRemoteUnlockState(CallbackContext callbackContext,String lockdata,String lockMac ){
    TTLockClient.getDefault().getRemoteUnlockSwitchState( lockdata,lockMac,new GetRemoteUnlockStateCallback() {
        @Override
        public void onGetRemoteUnlockSwitchStateSuccess(boolean enabled) {
         Log.d(TAG,"set remote"+enabled);
         callbackContext.success("set remote"+enabled);
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//Set lock Time
public void setLockTime(CallbackContext callbackContext, long time,String lockdata,String lockMac){
    TTLockClient.getDefault().setLockTime(time, lockdata,lockMac, new SetLockTimeCallback() {
        @Override
        public void onSetTimeSuccess() {
            callbackContext.success("lock time is corrected");
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//get lock Time
public void getLockTime(CallbackContext callbackContext,String lockdata,String lockMac){
    TTLockClient.getDefault().getLockTime(lockdata,lockMac, new GetLockTimeCallback() {
        @Override
        public void onGetLockTimeSuccess(long lockTimestamp) {
            Log.d(TAG,"get locktime"+lockTimestamp);
            callbackContext.success("get locktime"+lockTimestamp);
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//get bettry level
public void getBatteryLevel(CallbackContext callbackContext,String lockdata,String lockMac){
    TTLockClient.getDefault().getBatteryLevel(lockdata,lockMac, new GetBatteryLevelCallback() {
        @Override
        public void onGetBatteryLevelSuccess(int electricQuantity) {
            Log.d(TAG,"lock battery is " + electricQuantity + "%");
            callbackContext.success("lock battery is " + electricQuantity + "%");
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//create Custom Passcode
public void createCustomPasscode(CallbackContext callbackContext,long startDate,long endDate,String passcode,String lockdata,String lockMac){
    TTLockClient.getDefault().createCustomPasscode(passcode, startDate, endDate,lockdata,lockMac, new CreateCustomPasscodeCallback() {
        @Override
        public void onCreateCustomPasscodeSuccess(String passcode) {
            Log.d(TAG,passcode);
         callbackContext.success(passcode);
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//modify passcode
public void modifyPasscode(CallbackContext callbackContext,String originalPasscode,String newPasscode,long newStartDate,long newEndDate, String lockdata,String lockMac){
    TTLockClient.getDefault().modifyPasscode(originalPasscode, newPasscode, newStartDate, newEndDate,lockdata,lockMac, new ModifyPasscodeCallback() {
        @Override
        public void onModifyPasscodeSuccess() {
            callbackContext.success("passcode is modified success");
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });   
}
//Delete passcode
public void deletePasscode(CallbackContext callbackContext, String passcode,String lockdata,String lockMac){
    TTLockClient.getDefault().deletePasscode(passcode,lockdata,lockMac, new DeletePasscodeCallback() {
        @Override
        public void onDeletePasscodeSuccess() {
            callbackContext.success(" passcode is deleted");
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//reset passcodes
public void resetPasscode(CallbackContext callbackContext,String lockdata,String lockMac){
    TTLockClient.getDefault().resetPasscode(lockdata, lockMac, new ResetPasscodeCallback() {
        @Override
        public void onResetPasscodeSuccess(String lockData) {
            Log.d(TAG,"- Success  lockdata are " +lockData);
            callbackContext.success("- Success  lock are " + lockData);
            //this must be done after callback success,or the lock passcode would be work well.
           // uploadResetPasscodeResult2Server(lockData);
        }
       @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//get all valid passcode
public void getAllValidPasscodes(CallbackContext callbackContext,String lockdata,String lockMac){
    TTLockClient.getDefault().getAllValidPasscodes(lockdata,lockMac, new GetAllValidPasscodeCallback() {
        @Override
        public void onGetAllValidPasscodeSuccess(String passcodeStr) {
            callbackContext.success(passcodeStr);
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//modify Admin passcode
public void modifyAdminPasscode(CallbackContext callbackContext, String newAdminPasscode,String lockdata,String lockMac){
    TTLockClient.getDefault().modifyAdminPasscode(newAdminPasscode,lockdata,lockMac, new ModifyAdminPasscodeCallback() {
        @Override
        public void onModifyAdminPasscodeSuccess(String passcode) {
            //this must be done after callback success.
            callbackContext.success(passcode);
            //uploadNewAdminPasscode2Server(passcode);
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//Add IC card
public void addICCard(CallbackContext callbackContext,String lockdata,String lockMac){
    // switch (type){
    //     case ADD_PERMANENT:

    //         break;
    //     case ADD_TIMED:
    //         addStartDate = System.currentTimeMillis();
    //         //means 2 minutes later this card will expired.
    //         addEndDate = addStartDate + 2 * 60 * 1000;
    //         break;
    //         default:
    //             break;
    // }
    TTLockClient.getDefault().addICCard(addStartDate, addEndDate,lockdata,lockMac, new AddICCardCallback() {
        @Override
        public void onEnterAddMode() {
            callbackContext.success("-you can put ic card on lock now-");
        }

        @Override
        public void onAddICCardSuccess(long cardNum) {
            callbackContext.success(String.valueOf(cardNum));
            //uploadICCard2Server(addStartDate,addEndDate,cardNum);
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
// modify Ic card period
public void modifyICCardValidityPeriod(CallbackContext callbackContext,long newStartDate,long newEndDate,String cardNum, String lockdata,String lockMac){
    TTLockClient.getDefault().modifyICCardValidityPeriod(newStartDate, newEndDate,cardNum,lockdata,lockMac, new ModifyICCardPeriodCallback() {
        @Override
        public void onModifyICCardPeriodSuccess() {
          callbackContext.success("-lock-modify success--");
          //  notifyModifyDate2Server(newStartDate,newEndDate);
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//Get all valid IC card
public void getAllValidCard(CallbackContext callbackContext,String lockdata,String lockMac){
    TTLockClient.getDefault().getAllValidICCards(lockdata,lockMac, new GetAllValidICCardCallback() {
        @Override
        public void onGetAllValidICCardSuccess(String cardDataStr) {
        callbackContext.success(cardDataStr);
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//delete Ic Card
public void deleteICCard(CallbackContext callbackContext,String cardNum,String lockdata,String lockMac){
    TTLockClient.getDefault().deleteICCard(cardNum, lockdata, lockMac, new DeleteICCardCallback() {
        @Override
        public void onDeleteICCardSuccess() {
            callbackContext.success("--IC card is deleted-");
            //this must be done
            //notifyDelete2Server();
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
} 
//clear all IC Card
public void clearAllICCard(CallbackContext callbackContext,String lockdata,String lockMac){
    TTLockClient.getDefault().clearAllICCard(lockdata,lockMac, new ClearAllICCardCallback() {
        @Override
        public void onClearAllICCardSuccess() {
           callbackContext.success("--all ic cards have been cleared success-");
    //        uploadClear2Server();
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
// get passage Mode
public void getPassageMode(CallbackContext callbackContext,String lockdata,String lockMac){
    TTLockClient.getDefault().getPassageMode(lockdata,lockMac, new GetPassageModeCallback() {
        @Override
        public void onGetPassageModeSuccess(String passageModeData) {
            callbackContext.success( passageModeData);
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//Set passage Mode
public void setPassageMode(CallbackContext callbackContext,String lockdata,String lockMac){
    PassageModeConfig modeData = new PassageModeConfig();
        modeData.setStartDate(8 * 60);//am: 8:00
        modeData.setEndDate(18 * 60);//pm:  6:00
        modeData.setModeType(PassageModeType.Weekly);
        //if mode is Weekly,then the WeekDays is
        int[] mCircleWeeksArray = {1,2,3,4,5};
        modeData.setRepeatWeekOrDays(GsonUtil.toJson(mCircleWeeksArray));
    TTLockClient.getDefault().setPassageMode(modeData,lockdata,lockMac, new SetPassageModeCallback() {
        @Override
        public void onSetPassageModeSuccess() {
            callbackContext.success("-set passage mode success-");
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//delete passage mode
public void deletePassageMode(CallbackContext callbackContext,String lockdata,String lockMac){
    PassageModeConfig modeData = new PassageModeConfig();
    modeData.setStartDate(8 * 60);//am: 8:00
    modeData.setEndDate(18 * 60);//pm:  6:00
    modeData.setModeType(PassageModeType.Weekly);
    //if mode is Weekly,then the WeekDays is
    int[] mCircleWeeksArray = {2,3,4,5,6};
    modeData.setRepeatWeekOrDays(GsonUtil.toJson(mCircleWeeksArray));
    TTLockClient.getDefault().deletePassageMode(modeData,lockdata,lockMac, new DeletePassageModeCallback() {
        @Override
        public void onDeletePassageModeSuccess() {
            callbackContext.success("-delete passage mode success-");
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
// clear passage mode
public void clearPassageMode(CallbackContext callbackContext,String lockdata,String lockMac){
    TTLockClient.getDefault().clearPassageMode(lockdata,lockMac, new ClearPassageModeCallback() {
        @Override
        public void onClearPassageModeSuccess() {
            callbackContext.success("--all passage mode are cleared success-");
        }

        @Override
        public void onFail(LockError error) {
            callbackContext.error("err"+error);
        }
    });
}
//Scan gateway 
private void getScanGatewayCallback(CallbackContext callbackContext){
    GatewayClient.getDefault().startScanGateway(new ScanGatewayCallback() {
        @Override
        public void onScanGatewaySuccess(ExtendedBluetoothDevice device) {
            deviceGateway=device;
            callbackContext.success("gateway scan"+deviceGateway);
            //if (mListApapter != null)
               // mListApapter.updateData(device);
        }

        @Override
        public void onScanFailed(int errorCode) {
            callbackContext.error("err"+errorCode);
        }
    });
}

//connect gateway
 private void connectGateway(CallbackContext callbackContext){
    GatewayClient.getDefault().connectGateway(deviceGateway, new ConnectCallback() {
        @Override
        public void onConnectSuccess(ExtendedBluetoothDevice device) {
           // InitGatewayActivity.launch(mContext, item);
           callbackContext.success("connect gateway"+ device);
           // LogUtil.d("connect success");
        }

        @Override
        public void onDisconnected() {
            callbackContext.error("not connected gateway err");
        }
   });
 }
 //init gateway
private void initGateway(CallbackContext callbackContext,int uId,String userPassword,String SSID, String wifiPassword){
            configureGatewayInfo.uid = uId;
            configureGatewayInfo.userPwd = userPassword;
            configureGatewayInfo.ssid = SSID;
            configureGatewayInfo.wifiPwd = wifiPassword;
            configureGatewayInfo.plugName = deviceGateway.getAddress();
         GatewayClient.getDefault().initGateway(configureGatewayInfo, new InitGatewayCallback() {
        @Override
        public void onInitGatewaySuccess(DeviceInfo deviceInfo) {
            callbackContext.success("init gateway"+ deviceInfo);
        }

        @Override
        public void onFail(GatewayError error) {
            callbackContext.error(" init gateway err "+error);
        }
    });
 }
 
 //scan gateway available wifi
 private void scanWifi(CallbackContext callbackContext){
    GatewayClient.getDefault().scanWiFiByGateway(deviceGateway.getAddress(), new ScanWiFiByGatewayCallback() {
        @Override
        public void onScanWiFiByGateway(List<WiFi> wiFis) {
            //dialog.updateWiFi(wiFis);
            callbackContext.success("init gateway"+ wiFis);
        }

        @Override
        public void onScanWiFiByGatewaySuccess() {
            callbackContext.success("scan completed");
        }

        @Override
        public void onFail(GatewayError error) {
            callbackContext.error("scan wifi err "+error.getDescription());
        }
    });
 }
 //start DFU
 private void startDfu(CallbackContext callbackContext,String clientId,String accessToken,int gatewayId, String gatewayMac) {
    Context context=this.cordova.getActivity().getApplicationContext();
    GatewayDfuClient.getDefault().startDfu(context, clientId, accessToken,gatewayId, gatewayMac, new DfuCallback() {
        @Override
        public void onDfuSuccess(String deviceAddress) {
            callbackContext.success("dfu completed "+deviceAddress);
        }

        @Override
        public void onDfuAborted(String deviceAddress) {
            callbackContext.success("dfu aborted"+deviceAddress);
        }

        @Override
        public void onProgressChanged(String deviceAddress, int percent, float speed, float avgSpeed, int currentPart, int partsTotal) {
            callbackContext.success("dfu progress changed "+deviceAddress);
        }

        @Override
        public void onError() {
            //binding.llRetry.setVisibility(View.VISIBLE);
            callbackContext.error("dfu error ");
        }
    });
}
}