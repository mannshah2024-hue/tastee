import List "mo:core/List";
import Map "mo:core/Map";
import FoodTypes "../types/food";
import UserTypes "../types/user";
import UserLib "../lib/user";
import FoodLib "../lib/food";

mixin (
  users : List.List<UserTypes.User>,
  foodItems : List.List<FoodTypes.FoodItem>,
  history : List.List<FoodTypes.HistoryEntry>,
  swipes : List.List<FoodTypes.SwipeRecord>,
  shares : Map.Map<Text, FoodTypes.ShareRecord>,
) {

  func resolveToken(token : Text) : { #ok : UserTypes.User; #err : Text } {
    switch (UserLib.findByToken(users, token)) {
      case null { #err("Invalid or expired token") };
      case (?user) { #ok(user) };
    };
  };

  public shared ({ caller = _ }) func getHistory(token : Text) : async { #ok : [FoodTypes.HistoryEntry]; #err : Text } {
    switch (resolveToken(token)) {
      case (#err(e)) { #err(e) };
      case (#ok(user)) { #ok(FoodLib.getHistory(history, user.id)) };
    };
  };

  public shared ({ caller = _ }) func addHistory(token : Text, foodId : Text, feedback : Text) : async { #ok : FoodTypes.HistoryEntry; #err : Text } {
    switch (resolveToken(token)) {
      case (#err(e)) { #err(e) };
      case (#ok(user)) {
        let found = foodItems.find(func(f : FoodTypes.FoodItem) : Bool { f.id == foodId });
        switch found {
          case null { #err("Food item not found") };
          case (?item) {
            FoodLib.addHistory(history, user.id, item, feedback);
          };
        };
      };
    };
  };

  public shared ({ caller = _ }) func runDecision(token : Text, req : FoodTypes.DecisionRequest) : async { #ok : FoodTypes.DecisionResult; #err : Text } {
    switch (resolveToken(token)) {
      case (#err(e)) { #err(e) };
      case (#ok(user)) {
        FoodLib.runDecision(foodItems, swipes, history, user.id, req, user.preferences);
      };
    };
  };

  public shared ({ caller = _ }) func refineDecision(token : Text, sessionId : Text, excludeIds : [Text]) : async { #ok : FoodTypes.DecisionResult; #err : Text } {
    switch (resolveToken(token)) {
      case (#err(e)) { #err(e) };
      case (#ok(user)) {
        FoodLib.refineDecision(foodItems, swipes, history, user.id, sessionId, excludeIds, user.preferences);
      };
    };
  };

  public shared ({ caller = _ }) func recordSwipe(token : Text, foodId : Text, direction : Text) : async { #ok : FoodTypes.SwipeRecord; #err : Text } {
    switch (resolveToken(token)) {
      case (#err(e)) { #err(e) };
      case (#ok(user)) {
        FoodLib.recordSwipe(swipes, foodItems, user.id, foodId, direction);
      };
    };
  };

  public shared ({ caller = _ }) func undoLastSwipe(token : Text) : async { #ok : FoodTypes.SwipeRecord; #err : Text } {
    switch (resolveToken(token)) {
      case (#err(e)) { #err(e) };
      case (#ok(user)) {
        FoodLib.undoLastSwipe(swipes, user.id);
      };
    };
  };

  public shared ({ caller = _ }) func savePick(token : Text, foodId : Text) : async { #ok : FoodTypes.HistoryEntry; #err : Text } {
    switch (resolveToken(token)) {
      case (#err(e)) { #err(e) };
      case (#ok(user)) {
        FoodLib.savePick(history, foodItems, user.id, foodId);
      };
    };
  };

  public shared ({ caller = _ }) func createShareLink(token : Text, foodId : Text) : async { #ok : FoodTypes.ShareRecord; #err : Text } {
    switch (resolveToken(token)) {
      case (#err(e)) { #err(e) };
      case (#ok(user)) {
        FoodLib.createShareLink(shares, foodItems, user.id, foodId);
      };
    };
  };

  public query func getSharedPick(shareId : Text) : async { #ok : FoodTypes.ShareRecord; #err : Text } {
    FoodLib.getSharedPick(shares, shareId);
  };
};
