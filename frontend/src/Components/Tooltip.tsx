/**@jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface Props {
  text: string;
  direction?: 'top' | 'right' | 'bottom' | 'left';
}

export const Tooltip = ({ text, direction = 'top' }: Props) => {
  const getBorderTop = () => {
    switch (direction) {
      case 'top':
        return '5px solid';

      case 'right':
        return '6px solid transparent';

      case 'bottom':
        break;

      case 'left':
        return '6px solid transparent';

      default:
        break;
    }
  };

  const getBorderRight = () => {
    switch (direction) {
      case 'top':
        return '6px solid transparent';

      case 'right':
        return '5px solid';

      case 'bottom':
        return '6px solid transparent';

      case 'left':
        break;

      default:
        break;
    }
  };

  const getBorderBottom = () => {
    switch (direction) {
      case 'top':
        return '';

      case 'right':
        return '6px solid transparent';

      case 'bottom':
        return '5px solid';

      case 'left':
        return '6px solid transparent';

      default:
        break;
    }
  };

  const getBorderLeft = () => {
    switch (direction) {
      case 'top':
        return '6px solid transparent';

      case 'right':
        break;

      case 'bottom':
        return '6px solid transparent';

      case 'left':
        return '5px solid';

      default:
        break;
    }
  };

  return (
    <span
      css={css`
        font-size: 14px;
        visibility: hidden;
        width: 120px;
        background-color: black;
        color: white;
        text-align: center;
        border-radius: 6px;
        padding: 5px 0;
        position: absolute;
        z-index: 1;
        top: ${direction === 'left' || direction === 'right' ? '-6px' : direction === 'bottom' ? '150%' : ''};
        right: ${direction === 'left' ? '120%' : ''};
        bottom: ${direction === 'top' ? '150%' : ''};
        left: ${direction === 'top' || direction === 'bottom' ? '50%' : direction === 'right' ? '120%' : ''};
        margin-left: ${direction === 'top' || direction === 'bottom' ? '-60px' : ''};
        ::before {
          content: '';
          position: absolute;
          border-top: ${getBorderTop()};
          border-right: ${getBorderRight()};
          border-bottom: ${getBorderBottom()};
          border-left: ${getBorderLeft()};
          top: ${direction === 'top' ? '100%' : direction === 'left' || direction === 'right' ? '50%' : ''};
          right: ${direction === 'right' ? '100%' : ''};
          bottom: ${direction === 'bottom' ? '100%' : ''};
          left: ${direction === 'left' ? '100%' : direction === 'top' || direction === 'bottom' ? '50%' : ''};
          margin-left: ${direction === 'top' || direction === 'bottom' ? '-5px' : ''};
          margin-top: ${direction === 'left' || direction === 'right' ? '-5px' : ''};
          border-top-color: ${direction === 'top' ? 'black' : 'transparent'};
          border-right-color: ${direction === 'right' ? 'black' : 'transparent'};
          border-bottom-color: ${direction === 'bottom' ? 'black' : 'transparent'};
          border-left-color: ${direction === 'left' ? 'black' : 'transparent'};
        }
      `}
    >
      {text}
    </span>
  );
};
