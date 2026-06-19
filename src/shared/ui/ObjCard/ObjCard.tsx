import {
  isRenderPropType,
  type IObjCard,
  type ObjCardMenuType,
  type ObjCardStyles,
  type RenderPropType,
} from './types';
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state';
import {
  Box,
  IconButton,
  MenuItem,
  Popover,
  type SxProps,
  type Theme,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';

export const ObjCard = (props: IObjCard) => {
  const { styles: propsStyles, photoURL } = props;

  return (
    <Box sx={{ ...styles.container, ...propsStyles?.container } as SxProps}>
      {photoURL ? <img src={photoURL} style={propsStyles?.photo} /> : <></>}
      <Box
        sx={
          { ...styles.infoContainer, ...propsStyles?.infoContainer } as SxProps
        }
      >
        <Header {...props} propsStyles={propsStyles as any} />
        <PropsList {...props} />
      </Box>
    </Box>
  );
};

const Header = ({
  propsStyles,
  renderInHeader,
  menu,
}: {
  propsStyles?: { header: SxProps<Theme>; headerLeftContainer: SxProps<Theme> };
  renderInHeader: React.ReactNode;
  menu?: ObjCardMenuType;
}) => {
  return (
    <Box sx={{ ...styles.header, ...propsStyles?.header } as SxProps}>
      <Box
        sx={
          {
            ...styles.headerLeftContainer,
            ...propsStyles?.headerLeftContainer,
          } as SxProps
        }
      >
        {renderInHeader}
      </Box>
      {menu ? <ObjCardMenu {...menu} /> : <></>}
    </Box>
  );
};

const PropsList = (props: {
  renderForKeys: (RenderPropType | React.ReactNode)[];
  translatedNamesForKeys?: Record<string | number | symbol, string>;
}) => {
  const { renderForKeys } = props;

  return (
    <Box sx={styles.props}>
      {renderForKeys.map((render) => (
        <>
          {isRenderPropType(render) ? (
            <PropWithKey render={render} {...props} />
          ) : (
            render
          )}
        </>
      ))}
    </Box>
  );
};

const PropWithKey = ({
  render,
  translatedNamesForKeys,
}: {
  render: RenderPropType;
  translatedNamesForKeys?: Record<string | number | symbol, string>;
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        border: '2px gray solid',
        borderRadius: '20px',
      }}
    >
      <Box
        sx={{
          backgroundColor: 'gray',
          width: '40%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          borderRadius: '20px',
        }}
      >
        <span>
          {translatedNamesForKeys?.hasOwnProperty(render.key)
            ? translatedNamesForKeys[render.key]
            : render.key.toString()}
        </span>
      </Box>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          wordBreak: 'break-all',
        }}
      >
        {render.renderItem}
      </Box>
    </Box>
  );
};

const styles: ObjCardStyles = {
  container: {
    border: '2px grey solid',
    display: 'flex',
    flexDirection: 'row',
    height: '35vh',
  },
  photo: {},
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  header: {
    borderBottom: '2px grey solid',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    px: '6%',
  },
  headerLeftContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  props: {
    display: 'flex',
    flexDirection: 'column',
    p: '3%',
    gap: 1,
    overflow: 'auto',
  },
  prop: {},
  propKeyName: {},
  propContentContainer: {},
};

const ObjCardMenu = (props: ObjCardMenuType) => {
  const { trigger, menuItems } = props;

  return (
    <PopupState variant="popover">
      {(state) => (
        <>
          <IconButton {...bindTrigger(state)} {...trigger} size={'small'}>
            <MoreVert fontSize="small" />
          </IconButton>
          <Popover
            {...bindPopover(state)}
            transformOrigin={{ horizontal: 'center', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          >
            {menuItems.map((menuItem) => (
              <MenuItem
                {...menuItem}
                onClick={(e) => {
                  state.close();
                  menuItem.onClick?.(e);
                }}
              >
                {menuItem.renderBeforeLabel}
                {menuItem.label}
              </MenuItem>
            ))}
          </Popover>
        </>
      )}
    </PopupState>
  );
};
