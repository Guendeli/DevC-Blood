package guendeli.com.blood.fidami.mvp.presenters.impl;

import android.os.Handler;
import android.os.Looper;

import com.parse.GetCallback;
import com.parse.ParseException;
import com.parse.ParseObject;

import guendeli.com.blood.fidami.models.User;
import guendeli.com.blood.fidami.mvp.presenters.ProfilePresenter;
import guendeli.com.blood.fidami.mvp.views.ProfileView;

/**
 * Created by dino on 23/11/14.
 */
public class ProfilePresenterImpl implements ProfilePresenter {

    private boolean canceled;

    private ProfileView profileView;

    private Handler mainHandler = new Handler(Looper.getMainLooper());

    public ProfilePresenterImpl(ProfileView profileView) {
        this.profileView = profileView;
    }

    @Override
    public void saveData(final String name, final String surname, final String address,
                         final String bloodType, final String sex,
                         final String additional, final String rhType, final String age, final String weight) {
        profileView.showProgress();
        User.getInstance().getUserData(new GetCallback<ParseObject>() {
            @Override
            public void done(ParseObject parseObject, ParseException e) {
                parseObject.put(User.NAME, name);
                parseObject.put(User.SURNAME, surname);
                parseObject.put(User.ADDRESS, address);
                parseObject.put(User.BLOOD_TYPE, bloodType + rhType);
                parseObject.put(User.SEX, sex);
                parseObject.put(User.ADDITIONAL, additional);
                parseObject.put(User.AGE, age);
                parseObject.put(User.WEIGHT, weight);
                parseObject.saveInBackground();
                profileView.hideProgress();
            }
        });

    }

    @Override
    public void saveData(final String address, final String additional) {
        profileView.showProgress();
        User.getInstance().getUserData(new GetCallback<ParseObject>() {
            @Override
            public void done(ParseObject parseObject, ParseException e) {
                parseObject.put(User.ADDRESS, address);
                parseObject.put(User.ADDITIONAL, additional);
                parseObject.saveInBackground();
                profileView.hideProgress();
            }
        });
    }

    @Override
    public void cancel() {
        canceled = true;
    }
}
