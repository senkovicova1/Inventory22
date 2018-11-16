
import type { Action } from './types';
import {OPEN_DRAWER, CLOSE_DRAWER, CHANGE_MATERIAL, CHANGE_PLATFORM } from '../types';

export function openDrawer():Action {
  return {
    type: OPEN_DRAWER,
  };
}

export function closeDrawer():Action {
  return {
    type: CLOSE_DRAWER,
  };
}

export function changeMaterial():Action {
  return {
    type: CHANGE_MATERIAL,
  };
}

export function changePlatform():Action {
  return {
    type: CHANGE_PLATFORM,
  };
}
