package guendeli.com.blood.fidami.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import butterknife.ButterKnife;
import butterknife.BindView;
import guendeli.com.blood.fidami.R;
import guendeli.com.blood.fidami.mvp.presenters.ProfileOverviewPresenter;
import guendeli.com.blood.fidami.mvp.presenters.impl.ProfileOverviewPresenterImpl;
import guendeli.com.blood.fidami.mvp.views.ProfileOverviewView;

public class ProfileOverviewFragment extends BaseFragment implements ProfileOverviewView {

    @BindView(R.id.text_donated_liters_value)
    TextView textDonatedLitersValue;

    @BindView(R.id.text_current_achievements)
    TextView textCurrentAchievements;

    @BindView(R.id.text_ticket)
    TextView textTicket;

    @BindView(R.id.text_days_to_next)
    TextView textDaysToNext;

    private ProfileOverviewPresenter profileOverviewPresenter;

    public ProfileOverviewFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile_overview, container, false);
        ButterKnife.bind(this, view);

        profileOverviewPresenter = new ProfileOverviewPresenterImpl(this);
        profileOverviewPresenter.loadProfileData();
        return view;
    }

    @Override
    public void showData(String liters, String daysToNext, String achievements,
                         String points) {
        textDonatedLitersValue.setText(liters);
        textTicket.setText(points);
        textDaysToNext.setText(daysToNext);
        textCurrentAchievements.setText(achievements);
    }

    @Override
    public void showProgress() {
        showProgressBar();
    }

    @Override
    public void hideProgress() {
        hideProgressBar();
    }

    @Override
    public void showError(String message) {
        showDialog(message);
    }

    @Override
    public void onDestroyView() {
        profileOverviewPresenter.cancel();
        super.onDestroyView();
    }
}
