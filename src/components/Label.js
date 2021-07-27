import PropTypes from 'prop-types';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const RootStyle = styled('span')(({ theme, styleProps }) => {
  const { color, variant } = styleProps;

  const styleFilled = (colorx) => ({
    color: theme.palette[colorx].contrastText,
    backgroundColor: theme.palette[colorx].main
  });

  const styleOutlined = (colorx) => ({
    color: theme.palette[colorx].main,
    backgroundColor: 'transparent',
    border: `1px solid ${theme.palette[colorx].main}`
  });

  const styleGhost = (colorx) => ({
    color: theme.palette[colorx].dark,
    backgroundColor: alpha(theme.palette[colorx].main, 0.16)
  });

  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 8,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[800],
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    backgroundColor: theme.palette.grey[300],
    fontWeight: theme.typography.fontWeightBold,

    ...(color !== 'default'
      ? {
        ...(variant === 'filled' && { ...styleFilled(color) }),
        ...(variant === 'outlined' && { ...styleOutlined(color) }),
        ...(variant === 'ghost' && { ...styleGhost(color) })
      }
      : {
        ...(variant === 'outlined' && {
          backgroundColor: 'transparent',
          color: theme.palette.text.primary,
          border: `1px solid ${theme.palette.grey}`
        }),
        ...(variant === 'ghost' && {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.grey
        })
      })
  };
});

// ----------------------------------------------------------------------

export default function Label({
  color = 'default',
  variant = 'ghost',
  children,
  ...other
}) {
  return (
    <RootStyle styleProps={{ color, variant }} {...other}>
      {children}
    </RootStyle>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error'
  ]),
  variant: PropTypes.oneOf(['filled', 'outlined', 'ghost'])
};
