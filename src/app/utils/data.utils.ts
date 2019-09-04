import {LiveScheduleItem, ScheduleItem} from '../model/api/techzone-api.model';
import {TechTackLive, TechTalkCategory, TechTalkModel, TechTalkType} from '../model/tech-talk.model';
import {EVENT} from '../app.constants';

/**
 * Helper class to handle Data related operations
 */
export class DataUtils {

    /**
     * Generate a random number between 1-5 as qualification
     */
    static getRandomQualificationNumber(): number {
        const min = 1;
        const max = 5;
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    /**
     * Convery select time to event Time --> Use the event date as default
     * @param selectedDate from UI datepicker
     */
    static convertSelectTimeToEventTime(selectedDate: Date): Date {
        return new Date(EVENT.YEAR,
            (EVENT.MONTH - 1), // Javascript month starts in 0
            EVENT.DAY,
            selectedDate.getHours(),
            selectedDate.getMinutes(), 0, 0);
    }

    /**
     * Returns true if the date is between init and end date
     * @param date Selected date from UI
     * @param initDate Range to init
     * @param endDate Range to end
     */
    static betweenDate(date: Date, initDate: Date, endDate: Date): boolean {
        if (date && initDate && endDate) {
            const aDate = new Date(initDate);
            const bDate = new Date(endDate);

            if (bDate.getTime() > aDate.getTime()) {
                return aDate.getTime() <= date.getTime() && date.getTime() < bDate.getTime();
            }
        }
        return false;
    }

    /**
     * Given an array of Schedule Items order by date ASC
     * @param items Array of Schedule Items
     */
    static sortScheduleByInitialHour(items: Array<ScheduleItem>): Array<ScheduleItem> {
        return items.sort((a: ScheduleItem, b: ScheduleItem) => {
            if (a.initialHour && b.initialHour) {
                const aDate = new Date(a.initialHour);
                const bDate = new Date(b.initialHour);

                if (aDate.getTime() > bDate.getTime()) {
                    return 1;
                } else if (bDate.getTime() > aDate.getTime()) {
                    return -1;
                } else {
                    return 0;
                }
            } else {
                return 0;
            }
        });
    }

    /**
     * Map ScheduleItem to TechTalk model to show in UI.
     * @param item Obj from Server
     */
    static mapScheduleItemToTechTalkModel(item: ScheduleItem): TechTalkModel {
        const speakersNames = [];
        let photo = '';

        // Join speakers
        if (item.presenters && item.presenters.length) {
            item.presenters.map((presenter) => {
                speakersNames.push(presenter.name + ' ' + presenter.last_name);
                photo = presenter.photo;
            });
        }

        // Add presentation type
        let presentationType = null;
        if (item.presentationType && item.presentationType.icon) {
            if (item.presentationType.icon.indexOf('technical-paper') > -1) {
                presentationType = TechTalkType.TECH_TALK;
            } else if (item.presentationType.icon.indexOf('special-guest') > -1) {
                presentationType = TechTalkType.SPECIAL_GUEST;
            } else if (item.presentationType.icon.indexOf('time-icon') > -1) {
                presentationType = TechTalkType.BREAK;
            }
        }

        // Add category
        let presentationCategory = null;
        if (item.presentationCategory && item.presentationCategory.character) {
            switch (item.presentationCategory.character) {
                case 'A':
                    presentationCategory = TechTalkCategory.BASIC;
                    break;
                case 'B':
                    presentationCategory = TechTalkCategory.INTERMEDIATE;
                    break;
                case 'C':
                    presentationCategory = TechTalkCategory.ADVANCED;
                    break;
                case 'E':
                    presentationCategory = TechTalkCategory.BASIC;
                    break;
                default:
                    break;
            }
        }

        return {
            id: item._id,
            title: item.title,
            speakerName: speakersNames.join(', '),
            description: item.description,
            image: photo,
            time: {
                init: item.initialHour,
                end: item.finalHour
            },
            type: presentationType,
            category: presentationCategory
        };
    }

    /**
     * Map ScheduleItem Live to TechTalk Live model to show in UI.
     * @param item Obj from Server
     */
    static mapLiveSheduleItemToLiveTechTalk(item: LiveScheduleItem): TechTackLive {
        const newItem: TechTackLive = DataUtils.mapScheduleItemToTechTalkModel(item);
        newItem.feedback = item.feedback ? item.feedback : [];
        newItem.stars = item.feedbackAvg ? item.feedbackAvg : 0;
        newItem.votes = newItem.feedback.length;
        return newItem;
    }
}
