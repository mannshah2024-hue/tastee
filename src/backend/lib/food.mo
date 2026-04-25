import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Float "mo:core/Float";
import Text "mo:core/Text";
import Char "mo:core/Char";
import Types "../types/food";
import UserTypes "../types/user";

module {
  public type FoodItem = Types.FoodItem;
  public type HistoryEntry = Types.HistoryEntry;
  public type SwipeRecord = Types.SwipeRecord;
  public type ShareRecord = Types.ShareRecord;
  public type DecisionRequest = Types.DecisionRequest;
  public type DecisionResult = Types.DecisionResult;
  public type UserPreferences = UserTypes.UserPreferences;

  // Generate a simple text id
  public func generateId(prefix : Text, seed : Int) : Text {
    var h : Nat = 54321;
    var i : Nat = 0;
    let s = prefix # seed.toText();
    for (c in s.toIter()) {
      let code = c.toNat32();
      h := (h * 41 + Nat.fromNat32(code) + i * 5) % 4294967296;
      i += 1;
    };
    prefix # h.toText();
  };

  // Generate 8-char alphanumeric share id
  public func generateShareId(seed : Int) : Text {
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let charsArr = chars.toArray();
    let n = charsArr.size();
    var h : Nat = 7919;
    var i : Nat = 0;
    let s = "share" # seed.toText();
    for (c in s.toIter()) {
      let code = c.toNat32();
      h := (h * 43 + Nat.fromNat32(code) + i * 11) % 4294967296;
      i += 1;
    };
    // Build 8-char string
    var result = "";
    var cur = h;
    label genLoop for (_ in Nat.range(0, 8)) {
      let idx = cur % n;
      result := result # Text.fromChar(charsArr[idx]);
      cur := (cur * 6271 + 1) % 4294967296;
    };
    result;
  };

  public func seedFoodItems() : [FoodItem] {
    [
      // Street food ₹50-100
      {
        id = "food_vadapav";
        name = "Vada Pav";
        restaurant = "Mumbai Street Corner";
        price = 50;
        deliveryTime = 15;
        rating = 4.3;
        tags = ["veg", "street", "comfort", "popular"];
        imageUrl = "";
        reason = "Mumbai's beloved street snack";
        whyThis = "Crispy potato fritter in a soft bun with tangy chutneys — pure comfort in every bite";
        cuisineType = "street";
        isActive = true;
        swipeCount = 120;
      },
      {
        id = "food_samosachaat";
        name = "Samosa Chaat";
        restaurant = "Chaat Wala";
        price = 80;
        deliveryTime = 20;
        rating = 4.5;
        tags = ["veg", "street", "popular", "comfort"];
        imageUrl = "";
        reason = "Crispy samosas drenched in tangy chutneys";
        whyThis = "A riot of textures and flavours — the ultimate Indian street food experience";
        cuisineType = "street";
        isActive = true;
        swipeCount = 98;
      },
      {
        id = "food_panipuri";
        name = "Pani Puri";
        restaurant = "Golgappa King";
        price = 60;
        deliveryTime = 15;
        rating = 4.6;
        tags = ["veg", "street", "light", "popular"];
        imageUrl = "";
        reason = "India's most loved street snack";
        whyThis = "Hollow crispy puris filled with spiced water and mashed potato — addictive and refreshing";
        cuisineType = "street";
        isActive = true;
        swipeCount = 150;
      },
      // Mid-range ₹150-250
      {
        id = "food_butterchicken";
        name = "Butter Chicken";
        restaurant = "Punjabi Dhaba";
        price = 220;
        deliveryTime = 30;
        rating = 4.7;
        tags = ["non-veg", "comfort", "popular", "premium"];
        imageUrl = "";
        reason = "The iconic Indian curry loved worldwide";
        whyThis = "Tender chicken in a rich, creamy tomato sauce — a timeless classic that never disappoints";
        cuisineType = "north-indian";
        isActive = true;
        swipeCount = 200;
      },
      {
        id = "food_palakpaneer";
        name = "Palak Paneer";
        restaurant = "Green Bowl";
        price = 180;
        deliveryTime = 25;
        rating = 4.4;
        tags = ["veg", "comfort", "popular", "light"];
        imageUrl = "";
        reason = "Cottage cheese in creamy spinach gravy";
        whyThis = "Wholesome and nutritious with a beautifully balanced earthy flavour";
        cuisineType = "north-indian";
        isActive = true;
        swipeCount = 85;
      },
      {
        id = "food_chickenbiryani";
        name = "Chicken Biryani";
        restaurant = "Biryani House";
        price = 250;
        deliveryTime = 35;
        rating = 4.8;
        tags = ["non-veg", "comfort", "popular", "premium"];
        imageUrl = "";
        reason = "Aromatic layered rice with tender chicken";
        whyThis = "Slow-cooked fragrant basmati rice with juicy marinated chicken — a celebration in a pot";
        cuisineType = "hyderabadi";
        isActive = true;
        swipeCount = 230;
      },
      {
        id = "food_dalmakhani";
        name = "Dal Makhani";
        restaurant = "Punjabi Dhaba";
        price = 160;
        deliveryTime = 25;
        rating = 4.5;
        tags = ["veg", "comfort", "popular"];
        imageUrl = "";
        reason = "Slow-cooked black lentils in buttery gravy";
        whyThis = "Rich, creamy overnight-cooked lentils with a smoky flavour — North Indian soul food";
        cuisineType = "north-indian";
        isActive = true;
        swipeCount = 110;
      },
      {
        id = "food_cholebhature";
        name = "Chole Bhature";
        restaurant = "Amritsari Dhaba";
        price = 150;
        deliveryTime = 20;
        rating = 4.6;
        tags = ["veg", "comfort", "popular", "street"];
        imageUrl = "";
        reason = "Spicy chickpeas with fluffy deep-fried bread";
        whyThis = "The ultimate Punjabi breakfast combo — spiced chickpea curry with pillowy soft bhature";
        cuisineType = "north-indian";
        isActive = true;
        swipeCount = 140;
      },
      // Premium ₹300-500
      {
        id = "food_muttonbiryani";
        name = "Mutton Biryani";
        restaurant = "Royal Biryani";
        price = 380;
        deliveryTime = 45;
        rating = 4.9;
        tags = ["non-veg", "premium", "comfort", "popular"];
        imageUrl = "";
        reason = "Slow-cooked mutton biryani fit for royalty";
        whyThis = "Tender fall-off-the-bone mutton with aromatic spiced rice — the king of biryanis";
        cuisineType = "hyderabadi";
        isActive = true;
        swipeCount = 175;
      },
      {
        id = "food_prawnmasala";
        name = "Prawn Masala";
        restaurant = "Coastal Spice";
        price = 420;
        deliveryTime = 35;
        rating = 4.7;
        tags = ["non-veg", "premium", "popular"];
        imageUrl = "";
        reason = "Juicy prawns in a bold coastal masala";
        whyThis = "Fresh prawns cooked in a fiery coconut-tomato masala with coastal Indian spices";
        cuisineType = "coastal";
        isActive = true;
        swipeCount = 88;
      },
      {
        id = "food_payasoup";
        name = "Paya Soup";
        restaurant = "Old Delhi Kitchen";
        price = 300;
        deliveryTime = 30;
        rating = 4.4;
        tags = ["non-veg", "premium", "comfort"];
        imageUrl = "";
        reason = "Traditional slow-cooked trotters soup";
        whyThis = "A nourishing collagen-rich broth with tender meat — the ultimate comfort on a cold day";
        cuisineType = "mughlai";
        isActive = true;
        swipeCount = 45;
      },
      {
        id = "food_seekhkebab";
        name = "Seekh Kebab Platter";
        restaurant = "Tandoor Palace";
        price = 350;
        deliveryTime = 30;
        rating = 4.8;
        tags = ["non-veg", "premium", "popular", "light"];
        imageUrl = "";
        reason = "Smoky minced meat kebabs from the tandoor";
        whyThis = "Juicy spiced minced meat skewers chargrilled to perfection with mint chutney";
        cuisineType = "mughlai";
        isActive = true;
        swipeCount = 130;
      },
      // Fast Food
      {
        id = "food_masaladosa";
        name = "Masala Dosa";
        restaurant = "South Spice";
        price = 120;
        deliveryTime = 20;
        rating = 4.6;
        tags = ["veg", "popular", "light", "street"];
        imageUrl = "";
        reason = "Crispy rice crepe with spiced potato filling";
        whyThis = "Thin golden-crisp dosa stuffed with tangy spiced potato — South India at its finest";
        cuisineType = "south-indian";
        isActive = true;
        swipeCount = 160;
      },
      {
        id = "food_pavbhaji";
        name = "Pav Bhaji";
        restaurant = "Mumbai Express";
        price = 110;
        deliveryTime = 20;
        rating = 4.5;
        tags = ["veg", "street", "comfort", "popular"];
        imageUrl = "";
        reason = "Buttery mashed vegetable curry with soft buns";
        whyThis = "A tangy, buttery medley of vegetables mashed and spiced, served with toasted pav";
        cuisineType = "street";
        isActive = true;
        swipeCount = 145;
      },
      {
        id = "food_idlisambar";
        name = "Idli Sambar";
        restaurant = "Udupi Garden";
        price = 90;
        deliveryTime = 15;
        rating = 4.3;
        tags = ["veg", "light", "popular", "vegan"];
        imageUrl = "";
        reason = "Fluffy steamed rice cakes with lentil soup";
        whyThis = "Soft pillowy idlis with tangy sambar and coconut chutney — the healthiest comfort food";
        cuisineType = "south-indian";
        isActive = true;
        swipeCount = 95;
      },
    ];
  };

  // Score a single food item
  public func scoreFood(
    item : FoodItem,
    swipes : List.List<SwipeRecord>,
    history : List.List<HistoryEntry>,
    userId : Text,
    req : DecisionRequest,
    prefs : UserPreferences,
  ) : Float {
    // Rating score (0 to 1, rating is 0-5)
    let ratingScore = item.rating / 5.0;

    // Preference match
    let dietMatch : Float = if (item.tags.any(func(t : Text) : Bool { t == prefs.dietaryType })) {
      1.0;
    } else if (prefs.dietaryType == "veg" and item.tags.any(func(t : Text) : Bool { t == "vegan" })) {
      1.0;
    } else {
      0.0;
    };
    let cuisineMatch : Float = if (prefs.cuisines.size() == 0) {
      0.5;
    } else if (prefs.cuisines.any(func(c : Text) : Bool { c == item.cuisineType })) {
      1.0;
    } else {
      0.0;
    };
    let preferenceScore = (dietMatch + cuisineMatch) / 2.0;

    // Budget fit
    let effectiveBudget : ?Nat = switch (req.budgetOverride) {
      case (?b) { ?b };
      case null { prefs.budget };
    };
    let budgetScore : Float = switch effectiveBudget {
      case null { 0.5 }; // no budget set, neutral
      case (?budget) {
        let budgetFloat = budget.toFloat();
        if (item.price.toFloat() <= budgetFloat * 0.7) {
          1.0;
        } else if (item.price.toFloat() <= budgetFloat) {
          0.7;
        } else {
          0.0;
        };
      };
    };

    // Popularity: normalised swipeCount (max 250 assumed)
    let maxSwipes : Float = 250.0;
    let popularityScore = Float.min(item.swipeCount.toFloat() / maxSwipes, 1.0);

    // Recency: 1.0 if NOT in user's last 3 history entries, 0.0 if it has been
    let userHistory = history.filter(func(h : HistoryEntry) : Bool { h.userId == userId });
    let histArray = userHistory.toArray();
    let histSize = histArray.size();
    let last3 = if (histSize > 3) {
      histArray.sliceToArray((histSize - 3 : Nat).toInt(), histSize.toInt());
    } else {
      histArray;
    };
    let recentScore : Float = if (last3.any(func(h : HistoryEntry) : Bool { h.foodItem.id == item.id })) {
      0.0;
    } else {
      1.0;
    };

    // Weighted base score
    var score = ratingScore * 0.35 + preferenceScore * 0.30 + budgetScore * 0.20 + popularityScore * 0.10 + recentScore * 0.05;

    // Mood multipliers
    let mood = switch (req.mood) {
      case (?m) { m };
      case null { "" };
    };
    if (mood == "tired") {
      if (item.tags.any(func(t : Text) : Bool { t == "comfort" })) {
        score := score * 1.3;
      };
    } else if (mood == "healthy") {
      if (item.tags.any(func(t : Text) : Bool { t == "light" })) {
        score := score * 1.3;
      } else if (item.tags.any(func(t : Text) : Bool { t == "comfort" })) {
        score := score * 0.6;
      };
    } else if (mood == "celebrating") {
      if (item.tags.any(func(t : Text) : Bool { t == "popular" or t == "premium" })) {
        score := score * 1.2;
      };
    };

    // Cuisine preference from request
    switch (req.cuisinePreference) {
      case (?cp) {
        if (item.cuisineType == cp) {
          score := score * 1.15;
        };
      };
      case null {};
    };

    // Personalisation: swipe history
    let userSwipes = swipes.filter(func(s : SwipeRecord) : Bool { s.userId == userId and s.foodId == item.id });
    // find last swipe on this item
    let swipeArr = userSwipes.toArray();
    if (swipeArr.size() > 0) {
      let lastSwipe = swipeArr[swipeArr.size() - 1];
      if (lastSwipe.direction == "right") {
        score := score * 1.2;
      } else if (lastSwipe.direction == "left") {
        score := score * 0.5;
      } else if (lastSwipe.direction == "up") {
        score := score * 1.3;
      };
    };

    score;
  };

  public func runDecision(
    foodItems : List.List<FoodItem>,
    swipes : List.List<SwipeRecord>,
    history : List.List<HistoryEntry>,
    userId : Text,
    req : DecisionRequest,
    prefs : UserPreferences,
  ) : { #ok : DecisionResult; #err : Text } {
    let activeItems = foodItems.filter(func(f : FoodItem) : Bool { f.isActive }).toArray();
    if (activeItems.size() == 0) {
      return #err("No food items available");
    };

    // Score all items
    let scored = activeItems.map(func(item) {
      (item, scoreFood(item, swipes, history, userId, req, prefs));
    });

    // Sort by score descending
    let sorted = scored.sort(func(a : (FoodItem, Float), b : (FoodItem, Float)) : { #less; #equal; #greater } {
      if (a.1 > b.1) { #less } else if (a.1 < b.1) { #greater } else { #equal };
    });

    // Take top 3
    let top3Size = Nat.min(3, sorted.size());
    let top3 = sorted.sliceToArray(0, top3Size.toInt());

    // Assign badges
    let picks = buildPicksWithBadges(top3, activeItems);

    let sessionId = generateId("sess", Time.now());
    #ok({ picks; sessionId });
  };

  // Helper to assign badges to top picks
  func buildPicksWithBadges(top3 : [(FoodItem, Float)], allItems : [FoodItem]) : [FoodItem] {
    if (top3.size() == 0) return [];

    // Find lowest price and shortest delivery among all active items
    let minPrice = allItems.foldLeft(
      999999 : Nat,
      func(acc : Nat, f : FoodItem) : Nat { Nat.min(acc, f.price) },
    );
    let minDelivery = allItems.foldLeft(
      9999 : Nat,
      func(acc : Nat, f : FoodItem) : Nat { Nat.min(acc, f.deliveryTime) },
    );

    // Badge map: 0=Best for you, 1=Budget pick, 2=Quick option
    let result = List.empty<FoodItem>();
    var assignedBudget = false;
    var assignedQuick = false;

    // first pick is always "Best for you"
    let (firstItem, _) = top3[0];
    result.add({ firstItem with reason = firstItem.reason # " 🏆 Best for you" });

    var idx = 1;
    while (idx < top3.size()) {
      let (item, _) = top3[idx];
      if (not assignedBudget and item.price <= minPrice + 50) {
        result.add({ item with reason = item.reason # " 💰 Budget pick" });
        assignedBudget := true;
      } else if (not assignedQuick and item.deliveryTime <= minDelivery + 5) {
        result.add({ item with reason = item.reason # " ⚡ Quick option" });
        assignedQuick := true;
      } else {
        result.add(item);
      };
      idx += 1;
    };

    result.toArray();
  };

  public func refineDecision(
    foodItems : List.List<FoodItem>,
    swipes : List.List<SwipeRecord>,
    history : List.List<HistoryEntry>,
    userId : Text,
    sessionId : Text,
    excludeIds : [Text],
    prefs : UserPreferences,
  ) : { #ok : DecisionResult; #err : Text } {
    // Filter out excluded items
    let filteredItems = foodItems.filter(func(f : FoodItem) : Bool {
      f.isActive and not excludeIds.any(func(id : Text) : Bool { id == f.id });
    });

    let req : DecisionRequest = { mood = null; budgetOverride = null; cuisinePreference = null };
    let activeItems = filteredItems.toArray();
    if (activeItems.size() == 0) {
      return #err("No food items available after filtering");
    };

    let scored = activeItems.map(func(item) {
      (item, scoreFood(item, swipes, history, userId, req, prefs));
    });

    let sorted = scored.sort(func(a : (FoodItem, Float), b : (FoodItem, Float)) : { #less; #equal; #greater } {
      if (a.1 > b.1) { #less } else if (a.1 < b.1) { #greater } else { #equal };
    });

    let top3Size = Nat.min(3, sorted.size());
    let top3 = sorted.sliceToArray(0, top3Size.toInt());
    let picks = buildPicksWithBadges(top3, activeItems);

    #ok({ picks; sessionId });
  };

  public func getHistory(history : List.List<HistoryEntry>, userId : Text) : [HistoryEntry] {
    let userHistory = history.filter(func(h : HistoryEntry) : Bool { h.userId == userId }).toArray();
    // Sort newest first
    userHistory.sort(func(a : HistoryEntry, b : HistoryEntry) : { #less; #equal; #greater } {
      if (a.savedAt > b.savedAt) { #less } else if (a.savedAt < b.savedAt) { #greater } else { #equal };
    });
  };

  public func addHistory(
    history : List.List<HistoryEntry>,
    userId : Text,
    foodItem : FoodItem,
    feedback : Text,
  ) : { #ok : HistoryEntry; #err : Text } {
    let now = Time.now();
    let entry : HistoryEntry = {
      id = generateId("hist", now);
      userId;
      foodItem;
      feedback;
      savedAt = now;
    };
    history.add(entry);
    #ok(entry);
  };

  public func recordSwipe(
    swipes : List.List<SwipeRecord>,
    foodItems : List.List<FoodItem>,
    userId : Text,
    foodId : Text,
    direction : Text,
  ) : { #ok : SwipeRecord; #err : Text } {
    // Verify food exists
    let found = foodItems.find(func(f : FoodItem) : Bool { f.id == foodId });
    switch found {
      case null { #err("Food item not found") };
      case (?_) {
        let record : SwipeRecord = {
          userId;
          foodId;
          direction;
          swipedAt = Time.now();
        };
        swipes.add(record);
        #ok(record);
      };
    };
  };

  public func undoLastSwipe(swipes : List.List<SwipeRecord>, userId : Text) : { #ok : SwipeRecord; #err : Text } {
    // Find last swipe for user
    let idx = swipes.findLastIndex(func(s : SwipeRecord) : Bool { s.userId == userId });
    switch idx {
      case null { #err("No swipe found to undo") };
      case (?i) {
        let record = swipes.at(i);
        // Remove by rebuilding — filter out the last occurrence
        var removed = false;
        swipes.mapInPlace(func(s : SwipeRecord) : SwipeRecord {
          if (not removed and s.userId == userId and s.swipedAt == record.swipedAt and s.foodId == record.foodId) {
            removed := true;
            // We can't remove in place, so we mark it; but we need to actually remove
            // Use a sentinel — set swipedAt to 0 and filter after
            { s with swipedAt = 0 };
          } else {
            s;
          };
        });
        // Remove sentinels (swipedAt == 0)
        let cleaned = swipes.filter(func(s : SwipeRecord) : Bool { s.swipedAt != 0 });
        swipes.clear();
        swipes.append(cleaned);
        #ok(record);
      };
    };
  };

  public func savePick(
    history : List.List<HistoryEntry>,
    foodItems : List.List<FoodItem>,
    userId : Text,
    foodId : Text,
  ) : { #ok : HistoryEntry; #err : Text } {
    let found = foodItems.find(func(f : FoodItem) : Bool { f.id == foodId });
    switch found {
      case null { #err("Food item not found") };
      case (?item) {
        addHistory(history, userId, item, "saved");
      };
    };
  };

  public func createShareLink(
    shares : Map.Map<Text, ShareRecord>,
    foodItems : List.List<FoodItem>,
    userId : Text,
    foodId : Text,
  ) : { #ok : ShareRecord; #err : Text } {
    let found = foodItems.find(func(f : FoodItem) : Bool { f.id == foodId });
    switch found {
      case null { #err("Food item not found") };
      case (?item) {
        let now = Time.now();
        let shareId = generateShareId(now);
        let record : ShareRecord = {
          shareId;
          foodItem = item;
          createdAt = now;
          createdBy = userId;
        };
        shares.add(shareId, record);
        #ok(record);
      };
    };
  };

  public func getSharedPick(shares : Map.Map<Text, ShareRecord>, shareId : Text) : { #ok : ShareRecord; #err : Text } {
    switch (shares.get(shareId)) {
      case null { #err("Share link not found") };
      case (?record) { #ok(record) };
    };
  };
};
