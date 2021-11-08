import MyProfileForm from "./MyProfileForm";
import classes from "./MyProfile.module.css";

const MyProfile = () => {
  return (
    <section className={classes.profile}>
      <h1>My Profile</h1>
      <MyProfileForm />
    </section>
  );
};

export default MyProfile;
