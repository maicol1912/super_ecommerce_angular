import {AppEffects} from "./app.effects";
import {RouterEffects} from "./router.effects";
import {AuthEffects} from "./auth.effects";


export const Effects = [
  AppEffects,
  AuthEffects,
  RouterEffects,
];

export * from "./auth.effects"
export * from "./app.effects"
export * from "./router.effects"
