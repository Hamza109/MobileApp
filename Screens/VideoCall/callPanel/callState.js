import {DailyTrackState} from '@daily-co/react-native-daily-js';
import {DailyParticipant} from '@daily-co/react-native-daily-js';

/**
 * Represents the state of a call.
 * @typedef {Object} CallState
 * @property {Object.<string, CallItem>} callItems - Call items, keyed by id. "local" for the current participant, session ids for remote participants, and "<id>-screen" for each shared screen.
 * @property {string|null} camOrMicError - Camera or microphone error message, if any.
 * @property {string|null} fatalError - Fatal error message, if any.
 */

/**
 * Represents an item in a call.
 * @typedef {Object} CallItem
 * @property {DailyTrackState|null} videoTrackState - State of the video track.
 * @property {DailyTrackState|null} audioTrackState - State of the audio track.
 */

const initialCallState = {
  callItems: {
    local: {
      audioTrackState: null,
      videoTrackState: null,
    },
  },
  camOrMicError: null,
  fatalError: null,
};

// --- Actions ---

/**
 * PARTICIPANTS_CHANGE action structure:
 * - type: string
 * - participants: Object (from Daily.co callObject.participants())
 */
const PARTICIPANTS_CHANGE = 'PARTICIPANTS_CHANGE';

/**
 * Represents an action indicating a change in participants.
 *
 * @typedef {Object} ParticipantsChangeAction
 * @property {string} type - The action type, should correspond to PARTICIPANTS_CHANGE.
 * @property {Object.<string, DailyParticipant>} participants - The participants, keyed by their IDs.
 */

const CAM_OR_MIC_ERROR = 'CAM_OR_MIC_ERROR';

/**
 * Represents an action for camera or microphone error.
 *
 * @typedef {Object} CamOrMicErrorAction
 * @property {string} type - The action type, should correspond to CAM_OR_MIC_ERROR.
 * @property {string} message - The error message.
 */

const FATAL_ERROR = 'FATAL_ERROR';
/**
 * Represents a fatal error action.
 *
 * @typedef {Object} FatalError
 * @property {string} type - The action type, should correspond to FATAL_ERROR.
 * @property {string} message - The error message.
 */

/**
 * Represents a call state action which can be one of ParticipantsChangeAction,
 * CamOrMicErrorAction, or FatalError.
 *
 * In JavaScript, you'll typically check the type of action at runtime and handle it accordingly.
 */

// Example of using FatalError
const fatalErrorAction = {
  type: FATAL_ERROR,
  message: 'Some fatal error message',
};

// Example usage of CallStateAction
function handleCallStateAction(action) {
  switch (action.type) {
    case PARTICIPANTS_CHANGE:
      // handle ParticipantsChangeAction
      break;
    case CAM_OR_MIC_ERROR:
      // handle CamOrMicErrorAction
      break;
    case FATAL_ERROR:
      // handle FatalError
      break;
    // other cases...
  }
}

function callReducer(callState, action) {
  switch (action.type) {
    case PARTICIPANTS_CHANGE:
      const callItems = getCallItems(action.participants);
      return {
        ...callState,
        callItems,
      };
    case CAM_OR_MIC_ERROR:
      return {...callState, camOrMicError: action.message};
    case FATAL_ERROR:
      return {...callState, fatalError: action.message};
    default:
      throw new Error();
  }
}

function getCallItems(participants) {
  let callItems = {...initialCallState.callItems}; // Ensure we *always* have a local participant
  for (const [id, participant] of Object.entries(participants)) {
    callItems[id] = {
      videoTrackState: participant.tracks.video,
      audioTrackState: participant.tracks.audio,
    };
    if (shouldIncludeScreenCallItem(participant)) {
      callItems[id + '-screen'] = {
        videoTrackState: participant.tracks.screenVideo,
        audioTrackState: participant.tracks.screenAudio,
      };
    }
  }
  return callItems;
}

function shouldIncludeScreenCallItem(participant) {
  const trackStatesForInclusion = ['loading', 'playable', 'interrupted'];
  return (
    trackStatesForInclusion.includes(participant.tracks.screenVideo.state) ||
    trackStatesForInclusion.includes(participant.tracks.screenAudio.state)
  );
}

// --- Derived data ---

// True if id corresponds to local participant (*not* their screen share)
function isLocal(id) {
  return id === 'local';
}

function isScreenShare(id) {
  return id.endsWith('-screen');
}

function containsScreenShare(callItems) {
  return Object.keys(callItems).some(id => isScreenShare(id));
}

function participantCount(callItems) {
  return Object.keys(callItems).length;
}

function getMessage(callState, roomUrl) {
  let header = null;
  let detail = null;
  let isError = false;
  if (callState.fatalError) {
    header = `Fatal error: ${callState.fatalError}`;
    isError = true;
  } else if (callState.camOrMicError) {
    header = `Camera or mic access error: ${callState.camOrMicError}`;
    detail =
      'See https://help.daily.co/en/articles/2528184-unblock-camera-mic-access-on-a-computer to troubleshoot.';
    isError = true;
  } else if (participantCount(callState.callItems) === 1) {
    header = 'Copy and share this URL to invite others';
    detail = roomUrl;
  }
  return header ? {header, detail, isError} : null;
}

export {
  initialCallState,
  PARTICIPANTS_CHANGE,
  CAM_OR_MIC_ERROR,
  FATAL_ERROR,
  callReducer,
  isLocal,
  isScreenShare,
  containsScreenShare,
  participantCount,
  getMessage,
};
