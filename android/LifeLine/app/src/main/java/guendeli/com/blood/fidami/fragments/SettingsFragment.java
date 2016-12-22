package guendeli.com.blood.fidami.fragments;

import android.os.Bundle;
import android.support.annotation.Nullable;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Spinner;

import butterknife.BindView;
import butterknife.ButterKnife;
import guendeli.com.blood.fidami.R;

/**
 * Created by dino on 23/11/14.
 */
public class SettingsFragment extends BaseFragment {


    @BindView(R.id.spinner_language)
    Spinner spinner;

    @Override
    public View onCreateView(LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_settings, container, false);
        ButterKnife.bind(this, view);

        setLanguage();

        return view;
    }

    private void setLanguage() {

    }
}
