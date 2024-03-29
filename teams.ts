import {
  format,
  add,
  addMinutes,
  parse,
  differenceInDays,
  differenceInMinutes,
} from "date-fns";

const teams_array = [
  "Team A",
  "Team B",
  "Team C",
  "Team D",
  "Team E",
  "Team F",
  "Team G",
  "Team H",
  "Team I",
  "Team J",
];


// This function checks if any of the current teams are busy
const isTeamOverLap = (
  teamA: string,
  teamB: string,
  slots: Slot[],
  startTime: Date,
  endTime: Date
) => {
  let isOverlap = false;
  slots.forEach((slot) => {
    if (slot.match) {
      if (slot.match.teamA === teamA || slot.match.teamB === teamA) {
        if (slot.startTime >= startTime && slot.endTime <= endTime) {
          isOverlap = true;
          return;
        }
      }
      if (slot.match.teamA === teamB || slot.match.teamB === teamB) {
        if (slot.startTime >= startTime && slot.endTime <= endTime) {
          isOverlap = true;
          return;
        }
      }
    }
  });
  return isOverlap;
};

// Matches class is responsible for providing us the next match to be put in a slot,
// it makes sure all groups get equal number //of matches
class Matches {
  slots: Slot[];
  matches: Match[];
  lastGroup: string;
  lastIndex: number;
  index: number;
  constructor(matches: Match[]) {
    this.slots = [];
    this.matches = matches;
    this.index = 0;
    this.lastIndex = 0;
    this.lastGroup = matches[0].group;
  }
  getMatchCount() {
    return this.matches.length;
  }
  assignMatch(slot: Slot, match: Match) {
    slot.setMatch(match);
    this.slots.push(slot);
    this.matches.splice(this.matches.findIndex(m => m.id === match.id), 1);
  }
  getAllAssignedSlots() {
    return this.slots;
  }
  getRemainingMatches() {
    return this.matches;
  }
  getNextMatch() {
    const index = this.index++ % this.matches.length;
    // console.log(index);
    // console.log(this.matches.length);
    // return this.matches[index];
    return this.matches[index];
  }
}

// Match class is responsible for holding the match data and displaying it in a formatted way
class Match {
  teamA: string;
  teamB: string;
  venue: string;
  group: string;
  id: string;
  startTime: Date;
  endTime: Date;
  constructor(
    teamA: string,
    teamB: string,
    group: string,
    startTime?: Date,
    endTime?: Date
  ) {
    this.teamA = teamA;
    this.teamB = teamB;
    this.id = `${teamA}${teamB}`;
    this.group = group;
    this.startTime = startTime ?? new Date();
    this.endTime = endTime ?? new Date();
  }
  /**
   *  Get the match in a formatted way 
   * */
  format() {
    return `${this.teamA} vs ${this.teamB} from Group ${this.group}`;
  }
}

// Venue class is responsible for holding the venue data and displaying it in a formatted way
class Venue {
  name: string;
  slots: Slot[];
  isBusy: boolean;
  currentMatch: Match;
  constructor(name: string) {
    this.name = name;
    this.isBusy = false;
  }
  format() {
    return `${this.name}`;
  }
}

// Slot class is responsible for holding the slot data and displaying it in a formatted way
class Slot {
  venue: Venue;
  startTime: Date;
  endTime: Date;
  match: Match;
  day: number;

  constructor(venue: string, startTime: Date, endTime: Date, day: number) {
    this.venue = new Venue(venue);
    this.startTime = startTime;
    this.endTime = endTime;
    this.day = day;
  }

  setMatch(match: Match) {
    this.match = match;
    this.venue.currentMatch = match;
  }

  /**
   * @returns formatted slot output
   */
  format() {
    return `Day: ${this.day + 1} ${this?.match?.format()} ${this.venue.format()} at ${format(
      this.startTime,
      "HH:mm"
    )} to ${format(this.endTime, "HH:mm")}`;
  }
}

const slots: Slot[] = [];

const getMatches = (
  teams: string[],
  teams_count: number,
  no_of_groups: number
) => {
  const matches: Match[] = [];
  const teamsPerGroup = teams_count / no_of_groups;
  for (let groupIndex = 0; groupIndex < no_of_groups; groupIndex++) {
    const group = String.fromCharCode(65 + groupIndex);
    const teamSliceIndexStart = groupIndex * teamsPerGroup;
    const teamSliceIndexEnd = (groupIndex + 1) * teamsPerGroup;
    for (let i = teamSliceIndexStart; i < teamSliceIndexEnd; i++) {
      for (let j = i + 1; j < teamSliceIndexEnd; j++) {
        matches.push(new Match(teams[i], teams[j], group));
      }
    }
  }
  return matches;
};

const _venues: Venue[] = [];
/**
 * @param teams array of teams
 * @params teams_count number of teams
 * @param venues array of venues
 * @param tounamment_start_date start date of tournament
 * @param tounamment_end_date end date of tournament
 * @param break_time break time between matches
 * @param match_duration duration of each match
 * @param match_start_time start time of matches
 * @param match_end_time end time of matches
 * @returns generate a fixture algorithm
 */
function main(
  teams: string[],
  teams_count: number,
  venues: string[],
  tounamment_start_date: string,
  tounamment_end_date: string,
  break_time: number,
  match_duration: number,
  match_start_time: string,
  match_end_time: string,
  no_of_groups: number
) {
  venues.forEach((venue) => {
    _venues.push(new Venue(venue));
  });
  // get all possible matches between teams
  const matches = getMatches(teams, teams_count, no_of_groups);
  matches.forEach((match) => {
    // console.log(match.format());
  });

  // get all possible slots
  venues.forEach((venue) => {
    // get all days between dates in dayjs
    const days = differenceInDays(tounamment_end_date, tounamment_start_date);
    // for each day
    for (let i = 0; i < days; i++) {
      const totalMinutes = differenceInMinutes(
        parse(match_end_time, "HH:mm", new Date()),
        parse(match_start_time, "HH:mm", new Date())
      );

      let current_start_time = parse(match_start_time, "HH:mm", new Date());
      _venues.forEach((venue) => {
        venue.isBusy = false;
      });
      for (let j = 0; j < totalMinutes; j++) {
        _venues.forEach((venue) => {
          if (!venue.isBusy) {
            /**
             * `match_duration` hours from start time plus current minutes `j`
             */
            const current_end_time = add(addMinutes(current_start_time, j), {
              hours: match_duration,
            });

            /**
             * slot with venue name, start time, end time and day
             */
            const slot = new Slot(
              venue.name,
              addMinutes(current_start_time, j),
              current_end_time,
              i // day
            );

            slots.push(slot);

            venue.isBusy = true;
            venue.currentMatch = new Match(
              "A",
              "B",
              "group",
              addMinutes(current_start_time, j),
              current_end_time
            );
            return;
          }
          const diffInMins = differenceInMinutes(
            venue.currentMatch.endTime,
            addMinutes(current_start_time, j)
          );
          if (diffInMins === break_time * -1) {
            venue.isBusy = false;
          }
        });
      }
    }
  });

  const matchList = new Matches(matches);
  // console.log(slots.length, matchList.getMatchCount());
  slots.forEach((slot) => {
    const match = matchList.getNextMatch();
    if (match) {
      matchList.assignMatch(slot, match);
    }
  });

  console.log('assigned slots', matchList.getAllAssignedSlots().length);
  matchList.getAllAssignedSlots().forEach((slot) => {
    console.log(slot.format());
  });

  matchList.getRemainingMatches().forEach((match) => {
    // console.log(match.format());
  });
}

main(
  teams_array,
  teams_array.length,
  ["Court 1", "Court 2"],
  "2023-10-10",
  "2023-10-15",
  15,
  2,
  "15:00",
  "21:00",
  2
);
