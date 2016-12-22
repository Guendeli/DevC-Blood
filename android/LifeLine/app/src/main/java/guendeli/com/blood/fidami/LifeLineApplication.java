package guendeli.com.blood.fidami;

import android.app.Application;
import android.util.Log;

import com.facebook.FacebookSdk;
import com.onesignal.OneSignal;
import com.parse.Parse;
import com.parse.ParseException;
import com.parse.ParseFacebookUtils;
import com.parse.ParseInstallation;
import com.parse.ParsePush;
import com.parse.ParseTwitterUtils;
import com.parse.SaveCallback;

/**
 * Created by dino on 22/11/14.
 */
public class LifeLineApplication extends Application {

    private static LifeLineApplication instance;

    @Override
    public void onCreate() {
        super.onCreate();
        instance = this;
        FacebookSdk.sdkInitialize(this);
        OneSignal.startInit(this).init();

        Parse.setLogLevel(Parse.LOG_LEVEL_VERBOSE);

        Parse.enableLocalDatastore(getApplicationContext());
        Parse.initialize(new Parse.Configuration.Builder(this)
                .applicationId("fidami")
                .server("http://163.172.172.165:1337/parse/")
        .build()
        );
        ParseTwitterUtils.initialize("GtQtnF894a6USOPRIVZx2HWfv",
            "yiG7Sn6ZTlVQbKSCtylH9LRmNCGA4Ir6jdNyKXdQMSGu9oQmwx");
        ParseFacebookUtils.initialize(this);

        ParsePush.subscribeInBackground("all", new SaveCallback() {
            @Override
            public void done(ParseException e) {
                if (e == null) {
                    Log.d("com.parse.push", "successfully subscribed to the broadcast channel.");
                } else {
                    Log.e("com.parse.push", "failed to subscribe for push", e);
                }
            }
        });
    }

    public static LifeLineApplication getInstance() {
        return instance;
    }
}
