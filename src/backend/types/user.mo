import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  public type UserPreferences = {
    budget : ?Nat;
    dietaryType : Text; // "veg" | "non-veg" | "vegan"
    cuisines : [Text];
    notificationsEnabled : Bool;
  };

  public type User = {
    id : Text;
    name : Text;
    email : Text;
    passwordHash : Text;
    var token : ?Text;
    createdAt : Int;
    var preferences : UserPreferences;
  };

  // Shared (immutable) version for API responses
  public type UserPublic = {
    id : Text;
    name : Text;
    email : Text;
    createdAt : Int;
    preferences : UserPreferences;
  };

  public type SignupRequest = {
    name : Text;
    email : Text;
    password : Text;
  };

  public type LoginRequest = {
    email : Text;
    password : Text;
  };

  public type AuthResponse = {
    token : Text;
    user : UserPublic;
  };
};
