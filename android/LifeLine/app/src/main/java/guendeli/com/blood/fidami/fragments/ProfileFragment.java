package guendeli.com.blood.fidami.fragments;

import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Spinner;
import android.widget.Toast;

import com.parse.GetCallback;
import com.parse.ParseException;
import com.parse.ParseObject;
import com.parse.ParseUser;

import butterknife.ButterKnife;
import butterknife.BindView;
import butterknife.OnClick;
import guendeli.com.blood.fidami.R;
import guendeli.com.blood.fidami.models.User;
import guendeli.com.blood.fidami.mvp.presenters.ProfilePresenter;
import guendeli.com.blood.fidami.mvp.presenters.impl.ProfilePresenterImpl;
import guendeli.com.blood.fidami.mvp.views.ProfileView;

public class ProfileFragment extends BaseFragment implements ProfileView {

    @BindView(R.id.input_name)
    EditText inputName;

    @BindView(R.id.input_surname)
    EditText inputSurname;

    @BindView(R.id.input_age)
    EditText inputAge;

    @BindView(R.id.input_weight)
    EditText inputWeight;

    @BindView(R.id.spinner_sex)
    Spinner spinnerSex;

    @BindView(R.id.input_address)
    EditText inputAddress;

    @BindView(R.id.spinner_blood_type)
    Spinner spinnerBloodType;

    @BindView(R.id.spinner_rh)
    Spinner spinnerRh;

    @BindView(R.id.input_additional)
    EditText inputAdditional;

    @BindView(R.id.layout_blood_type)
    View layoutBloodType;

    @BindView(R.id.layout_sex)
    View layoutSex;

    @BindView(R.id.layout_rh)
    View layoutRh;

    private ProfilePresenter profilePresenter;

    private boolean isEdit;

    public ProfileFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile, container, false);
        ButterKnife.bind(this, view);
        boolean saved = this.getActivity().getSharedPreferences("prefs",Context.MODE_PRIVATE).getBoolean("saved", false);
        if (!ParseUser.getCurrentUser().isNew() || saved) {
            isEdit = true;
        }

        if (isEdit) {

            showProgress();
            User.getInstance().getUserData(new GetCallback<ParseObject>() {
                @Override
                public void done(final ParseObject parseObject, ParseException e) {
                    inputName.setText(parseObject.getString(User.NAME));
                    inputName.setClickable(false);
                    inputName.setFocusable(false);
                    inputName.setTextColor(Color.parseColor("#b7b7b7"));

                    inputSurname.setText(parseObject.getString(User.SURNAME));
                    inputSurname.setClickable(false);
                    inputSurname.setFocusable(false);
                    inputSurname.setTextColor(Color.parseColor("#b7b7b7"));

                    inputAge.setText(parseObject.getString(User.AGE));
                    inputAge.setClickable(false);
                    inputAge.setFocusable(false);
                    inputAge.setTextColor(Color.parseColor("#b7b7b7"));

                    inputWeight.setText(parseObject.getString(User.WEIGHT));
                    inputWeight.setClickable(false);
                    inputWeight.setFocusable(false);
                    inputWeight.setTextColor(Color.parseColor("#b7b7b7"));

                    spinnerSex.setSelection(getSpinnerIndex(spinnerSex, User.SEX));
                    spinnerBloodType.setSelection(getSpinnerIndex(spinnerBloodType, removeLastChar(User.BLOOD_TYPE)));
                    spinnerRh.setSelection(getSpinnerIndex(spinnerRh, User.BLOOD_TYPE.substring(User.BLOOD_TYPE.length()-1)));
                    inputAddress.setText(parseObject.getString(User.ADDRESS));
                    inputAdditional.setText(parseObject.getString(User.ADDITIONAL));
                    hideProgress();
                }
            });
        }

        profilePresenter = new ProfilePresenterImpl(this);

        return view;
    }

    @OnClick(R.id.button_save)
    protected void save() {
        final String name = inputName.getText().toString().trim();
        final String surname = inputSurname.getText().toString().trim();
        final String address = inputAddress.getText().toString().trim();
        final String bloodType = (String) spinnerBloodType.getSelectedItem();
        final String sex = (String) spinnerSex.getSelectedItem();
        final String additional = inputAdditional.getText().toString().trim();
        final String rhType = (String) spinnerRh.getSelectedItem();
        final String age = inputAge.getText().toString().trim();
        final String weight = inputWeight.getText().toString().trim();

        if (isEdit) {
            //profilePresenter.saveData(address, additional);
            profilePresenter.saveData(name, surname, address, bloodType, sex, additional, rhType,age,weight);
        } else {
            if (validate(name, surname)) {
                profilePresenter
                    .saveData(name, surname, address, bloodType, sex, additional, rhType,age,weight);
                SharedPreferences.Editor prefs = this.getActivity().getSharedPreferences("prefs", Context.MODE_PRIVATE).edit();
                prefs.putBoolean("saved", true);
                prefs.commit();
            }
        }
    }

    private boolean validate(String name, String surname) {
        boolean valid = true;

        if (surname.isEmpty()) {
            valid = false;
            inputSurname.setError(getString(R.string.field_required));
            inputSurname.requestFocus();
        }

        if (name.isEmpty()) {
            valid = false;
            inputName.setError(getString(R.string.field_required));
            inputName.requestFocus();
        }

        return valid;
    }

    private int getSpinnerIndex(Spinner spinner, String myString)
    {
        int index = 0;

        for (int i=0;i<spinner.getCount();i++){
            if (spinner.getItemAtPosition(i).toString().equalsIgnoreCase(myString)){
                index = i;
                break;
            }
        }
        return index;
    }

    @Override
    public void onSuccess() {
        Toast.makeText(getActivity(), getString(R.string.save_success), Toast.LENGTH_LONG).show();

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
        profilePresenter.cancel();
        super.onDestroyView();
    }

    public static String removeLastChar(String str){
        return str.substring(0,str.length()-1);
    }
}
