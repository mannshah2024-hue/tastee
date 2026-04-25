import List "mo:core/List";
import UserTypes "../types/user";
import UserLib "../lib/user";

mixin (users : List.List<UserTypes.User>) {

  public shared func signup(name : Text, email : Text, password : Text) : async { #ok : UserTypes.AuthResponse; #err : Text } {
    let req : UserTypes.SignupRequest = { name; email; password };
    switch (UserLib.create(users, req)) {
      case (#err(e)) { #err(e) };
      case (#ok(user)) {
        let loginReq : UserTypes.LoginRequest = { email; password };
        UserLib.authenticate(users, loginReq);
      };
    };
  };

  public shared func login(email : Text, password : Text) : async { #ok : UserTypes.AuthResponse; #err : Text } {
    let req : UserTypes.LoginRequest = { email; password };
    UserLib.authenticate(users, req);
  };

  public shared ({ caller = _ }) func getProfile(token : Text) : async { #ok : UserTypes.UserPublic; #err : Text } {
    switch (UserLib.findByToken(users, token)) {
      case null { #err("Invalid or expired token") };
      case (?user) { #ok(UserLib.toPublic(user)) };
    };
  };

  public shared ({ caller = _ }) func updatePreferences(token : Text, prefs : UserTypes.UserPreferences) : async { #ok : UserTypes.UserPublic; #err : Text } {
    switch (UserLib.findByToken(users, token)) {
      case null { #err("Invalid or expired token") };
      case (?user) { UserLib.updatePreferences(users, user.id, prefs) };
    };
  };
};
