package guendeli.com.blood.fidami.mvp.presenters.impl;

import com.parse.FindCallback;
import com.parse.ParseException;
import com.parse.ParseObject;

import java.util.ArrayList;
import java.util.List;

import guendeli.com.blood.fidami.models.User;
import guendeli.com.blood.fidami.mvp.presenters.AchievementsPresenter;
import guendeli.com.blood.fidami.mvp.views.AchievementsView;

/**
 * Created by dino on 23/11/14.
 */
public class AchievementsPresenterImpl implements AchievementsPresenter {

    private boolean canceled;

    private AchievementsView achievementsView;

    public AchievementsPresenterImpl(AchievementsView achievementsView) {
        this.achievementsView = achievementsView;
    }

    @Override
    public void loadAchievements() {
        achievementsView.showProgress();
        User.getInstance().getUserDonations(findCallback);
    }

    private FindCallback<ParseObject> findCallback = new FindCallback<ParseObject>() {
        @Override
        public void done(List<ParseObject> parseObjects, ParseException e) {

            if (canceled) {
                return;
            }

            achievementsView.hideProgress();
            if (parseObjects == null) {
                parseObjects = new ArrayList<>();
            }

            boolean[] achievements = new boolean[6];
            achievements[0] = parseObjects.size() >= 1;
            achievements[3] = parseObjects.size() >= 5;
            achievements[4] = parseObjects.size() >= 10;
            achievements[5] = parseObjects.size() >= 15;

            achievementsView.showAchievements(achievements);
        }
    };

    @Override
    public void cancel() {
        canceled = true;
    }
}
