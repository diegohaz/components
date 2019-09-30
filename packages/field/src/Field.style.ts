import styled from 'styled-components';
import {button, caption} from '@salad-ui/typography';
import {color} from '@salad-ui/color';
import {m, mt, mb} from '@salad-ui/spacing';

export interface LabelProps {}

export const Label = styled.label<LabelProps>`
  display: block;
  ${mb(0.5)}
  ${button()}
  ${color('onSurface.normal')}
`;

export interface HelpProps {
  isError: boolean;
}

export const Help = styled.p<HelpProps>`
  display: block;
  ${m(0)}
  ${mt(0.5)}
  ${color('onSurface.subtle')}
  ${caption()}
  ${({isError}) => isError && color('error.normal')}
`;
