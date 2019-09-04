/**
 * Original model from the endpoint
 */
export interface ScheduleItem {
    _id: string;
    title: string;
    type: string;
    category: string;
    description: string;
    phrase: string;
    finalHour: Date;
    initialHour: Date;
    presenters: Array<SchedulePresenter>;
    order: number;
    presentationType: PresentationType;
    presentationCategory: PresentationCategory;
    conference: string;
    attendees: string;
}

/**
 * Original model for Schedule Item adding feedback data
 */
export interface LiveScheduleItem extends ScheduleItem {
    feedback?: Array<FeedbackEntry>;
    feedbackAvg?: number;
    feedbackum?: number;
}


/**
 * Model with the Speaker info
 */
export interface SchedulePresenter {
    name: string;
    last_name: string;
    ci: string;
    phone: string;
    email: Array<string>;
    photo: string;
    biografy: string;
    nationality: Nationality;
    socialNetworks: Array<SocialNetwork>;
    presenter_type: string;
}

/**
 * Model to display the Speaker nationality
 */
export interface Nationality {
    name: string;
    image: string;
}

/**
 * Model to add information about Social Networks
 */
export interface SocialNetwork {
    _id: string;
    url: string;
    image: string;
    color: string;
}

/**
 * Model of Presentation type
 */
export interface PresentationType {
    title: string;
    icon: string;
    color: string;
    orderBy: string;
}

/**
 * Model of Presentation category
 */
export interface PresentationCategory {
    title: string;
    description: string;
    character: string;
    color: string;
}

/**
 * Model to send/store feedback
 */
export interface FeedbackEntry extends AuditInfo {
    qualification: number;
}

/**
 * Audit info for Firebase records
 */
export interface AuditInfo {
    _id: string;
    email: string;
    mobileDate: Date;
    synced?: boolean;
    syncTime?: Date;
}

