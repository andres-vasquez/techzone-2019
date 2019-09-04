/**
 * UI Model that represents the Schedule Item
 */
export class TechTalkModel {
    id: string;
    title: string;
    image: string;
    description: string;
    type?: TechTalkType;
    category?: TechTalkCategory;
    speakerName: string;
    time: {
        init: Date,
        end: Date
    };
}

/**
 * UI Model about Schedule Item with feedback info
 */
export interface TechTackLive extends TechTalkModel {
    feedback?: Array<Feedback>;
    stars?: number;
    votes?: number;
}

/**
 * Enum with techTalk types
 */
export enum TechTalkType {
    TECH_TALK,
    BREAK,
    SPECIAL_GUEST
}

/**
 * Enum with techTalk categories
 */
export enum TechTalkCategory {
    BASIC,
    INTERMEDIATE,
    UPPER_INTERMEDIATE,
    ADVANCED
}

/**
 * Feedback object to send to Firebase
 */
export interface Feedback {
    _id: string;
    email: string;
    qualification: number;
}

