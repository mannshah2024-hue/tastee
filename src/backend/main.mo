import List "mo:core/List";
import Map "mo:core/Map";
import FoodLib "lib/food";
import FoodTypes "types/food";
import UserTypes "types/user";
import UserApiMixin "mixins/user-api";
import FoodApiMixin "mixins/food-api";

actor {
  let users = List.empty<UserTypes.User>();
  let foodItems = List.fromArray<FoodTypes.FoodItem>(FoodLib.seedFoodItems());
  let history = List.empty<FoodTypes.HistoryEntry>();
  let swipes = List.empty<FoodTypes.SwipeRecord>();
  let shares = Map.empty<Text, FoodTypes.ShareRecord>();

  include UserApiMixin(users);
  include FoodApiMixin(users, foodItems, history, swipes, shares);
};
