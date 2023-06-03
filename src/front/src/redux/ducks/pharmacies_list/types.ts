import { InferValueTypes } from 'utils/types';
import * as actionCreators from './action_creators';

export type ActionsType = ReturnType<InferValueTypes<typeof actionCreators>>;
