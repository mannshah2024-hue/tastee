import Common "common";

module {
  public type UserId = Common.UserId;
  public type Timestamp = Common.Timestamp;

  public type FoodItem = {
    id : Text;
    name : Text;
    restaurant : Text;
    price : Nat;
    deliveryTime : Nat;
    rating : Float;
    tags : [Text];
    imageUrl : Text;
    reason : Text;
    whyThis : Text;
    cuisineType : Text;
    isActive : Bool;
    swipeCount : Nat;
  };

  public type HistoryEntry = {
    id : Text;
    userId : Text;
    foodItem : FoodItem;
    feedback : Text;
    savedAt : Int;
  };

  public type SwipeRecord = {
    userId : Text;
    foodId : Text;
    direction : Text; // "left" | "right" | "up" | "down"
    swipedAt : Int;
  };

  public type ShareRecord = {
    shareId : Text;
    foodItem : FoodItem;
    createdAt : Int;
    createdBy : Text;
  };

  public type DecisionRequest = {
    mood : ?Text;
    budgetOverride : ?Nat;
    cuisinePreference : ?Text;
  };

  public type DecisionResult = {
    picks : [FoodItem];
    sessionId : Text;
  };
};
