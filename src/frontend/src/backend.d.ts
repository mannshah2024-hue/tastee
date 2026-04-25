import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AuthResponse {
    token: string;
    user: UserPublic;
}
export interface UserPreferences {
    notificationsEnabled: boolean;
    dietaryType: string;
    cuisines: Array<string>;
    budget?: bigint;
}
export interface HistoryEntry {
    id: string;
    userId: string;
    feedback: string;
    savedAt: bigint;
    foodItem: FoodItem;
}
export interface UserPublic {
    id: string;
    name: string;
    createdAt: bigint;
    email: string;
    preferences: UserPreferences;
}
export interface DecisionRequest {
    mood?: string;
    cuisinePreference?: string;
    budgetOverride?: bigint;
}
export interface FoodItem {
    id: string;
    name: string;
    tags: Array<string>;
    swipeCount: bigint;
    cuisineType: string;
    deliveryTime: bigint;
    isActive: boolean;
    imageUrl: string;
    rating: number;
    price: bigint;
    whyThis: string;
    restaurant: string;
    reason: string;
}
export interface SwipeRecord {
    direction: string;
    userId: string;
    swipedAt: bigint;
    foodId: string;
}
export interface ShareRecord {
    createdAt: bigint;
    createdBy: string;
    shareId: string;
    foodItem: FoodItem;
}
export interface DecisionResult {
    sessionId: string;
    picks: Array<FoodItem>;
}
export interface backendInterface {
    addHistory(token: string, foodId: string, feedback: string): Promise<{
        __kind__: "ok";
        ok: HistoryEntry;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createShareLink(token: string, foodId: string): Promise<{
        __kind__: "ok";
        ok: ShareRecord;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getHistory(token: string): Promise<{
        __kind__: "ok";
        ok: Array<HistoryEntry>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getProfile(token: string): Promise<{
        __kind__: "ok";
        ok: UserPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getSharedPick(shareId: string): Promise<{
        __kind__: "ok";
        ok: ShareRecord;
    } | {
        __kind__: "err";
        err: string;
    }>;
    login(email: string, password: string): Promise<{
        __kind__: "ok";
        ok: AuthResponse;
    } | {
        __kind__: "err";
        err: string;
    }>;
    recordSwipe(token: string, foodId: string, direction: string): Promise<{
        __kind__: "ok";
        ok: SwipeRecord;
    } | {
        __kind__: "err";
        err: string;
    }>;
    refineDecision(token: string, sessionId: string, excludeIds: Array<string>): Promise<{
        __kind__: "ok";
        ok: DecisionResult;
    } | {
        __kind__: "err";
        err: string;
    }>;
    runDecision(token: string, req: DecisionRequest): Promise<{
        __kind__: "ok";
        ok: DecisionResult;
    } | {
        __kind__: "err";
        err: string;
    }>;
    savePick(token: string, foodId: string): Promise<{
        __kind__: "ok";
        ok: HistoryEntry;
    } | {
        __kind__: "err";
        err: string;
    }>;
    signup(name: string, email: string, password: string): Promise<{
        __kind__: "ok";
        ok: AuthResponse;
    } | {
        __kind__: "err";
        err: string;
    }>;
    undoLastSwipe(token: string): Promise<{
        __kind__: "ok";
        ok: SwipeRecord;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updatePreferences(token: string, prefs: UserPreferences): Promise<{
        __kind__: "ok";
        ok: UserPublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
