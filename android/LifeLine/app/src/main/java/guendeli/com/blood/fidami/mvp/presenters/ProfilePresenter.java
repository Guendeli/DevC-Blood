package guendeli.com.blood.fidami.mvp.presenters;

/**
 * Created by dino on 23/11/14.
 */
public interface ProfilePresenter extends BasePresenter {

    public void saveData(String name, String surname, String address, String bloodType, String sex,
                         String additional, String rhType, String age, String weight);

    public void saveData(String address, String additional);
}
