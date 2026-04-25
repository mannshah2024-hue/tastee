import List "mo:core/List";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Char "mo:core/Char";
import Types "../types/user";

module {
  public type User = Types.User;
  public type UserPublic = Types.UserPublic;
  public type UserPreferences = Types.UserPreferences;
  public type SignupRequest = Types.SignupRequest;
  public type LoginRequest = Types.LoginRequest;
  public type AuthResponse = Types.AuthResponse;

  // Simple hash: iterate chars, accumulate XOR + position weighted sum
  public func hashPassword(password : Text) : Text {
    var h : Nat = 5381;
    var i : Nat = 0;
    for (c in password.toIter()) {
      let code = c.toNat32();
      h := (h * 33 + Nat.fromNat32(code) + i * 7) % 4294967296;
      i += 1;
    };
    "h" # h.toText();
  };

  // Generate token: hash of userId + email + timestamp
  public func generateToken(userId : Text, email : Text) : Text {
    let seed = userId # email # Time.now().toText();
    var h : Nat = 99991;
    var i : Nat = 0;
    for (c in seed.toIter()) {
      let code = c.toNat32();
      h := (h * 31 + Nat.fromNat32(code) + i) % 4294967296;
      i += 1;
    };
    "tok" # h.toText();
  };

  public func toPublic(user : User) : UserPublic {
    {
      id = user.id;
      name = user.name;
      email = user.email;
      createdAt = user.createdAt;
      preferences = user.preferences;
    };
  };

  // Generate a simple id from prefix + timestamp + seed
  public func generateId(prefix : Text, seed : Int) : Text {
    var h : Nat = 12345;
    var i : Nat = 0;
    let s = prefix # seed.toText();
    for (c in s.toIter()) {
      let code = c.toNat32();
      h := (h * 37 + Nat.fromNat32(code) + i * 3) % 4294967296;
      i += 1;
    };
    prefix # h.toText();
  };

  public func create(users : List.List<User>, req : SignupRequest) : { #ok : User; #err : Text } {
    // Check email uniqueness
    let existing = users.find(func(u : User) : Bool { u.email == req.email });
    switch existing {
      case (?_) { #err("Email already registered") };
      case null {
        let now = Time.now();
        let id = generateId("usr", now);
        let user : User = {
          id;
          name = req.name;
          email = req.email;
          passwordHash = hashPassword(req.password);
          var token = null;
          createdAt = now;
          var preferences = {
            budget = null;
            dietaryType = "non-veg";
            cuisines = [];
            notificationsEnabled = false;
          };
        };
        users.add(user);
        #ok(user);
      };
    };
  };

  public func authenticate(users : List.List<User>, req : LoginRequest) : { #ok : AuthResponse; #err : Text } {
    let found = users.find(func(u : User) : Bool { u.email == req.email });
    switch found {
      case null { #err("Invalid email or password") };
      case (?user) {
        if (user.passwordHash != hashPassword(req.password)) {
          #err("Invalid email or password");
        } else {
          let token = generateToken(user.id, user.email);
          user.token := ?token;
          #ok({
            token;
            user = toPublic(user);
          });
        };
      };
    };
  };

  public func findByToken(users : List.List<User>, token : Text) : ?User {
    users.find(func(u : User) : Bool {
      switch (u.token) {
        case (?t) { t == token };
        case null { false };
      };
    });
  };

  public func findById(users : List.List<User>, userId : Text) : ?User {
    users.find(func(u : User) : Bool { u.id == userId });
  };

  public func updatePreferences(users : List.List<User>, userId : Text, prefs : UserPreferences) : { #ok : UserPublic; #err : Text } {
    let found = users.find(func(u : User) : Bool { u.id == userId });
    switch found {
      case null { #err("User not found") };
      case (?user) {
        user.preferences := prefs;
        #ok(toPublic(user));
      };
    };
  };
};
