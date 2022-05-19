import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    wrapper: {
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        minHeight: '62px',
        '&:hover, &:focus': {
            textDecoration: 'none',
            '& > div > span:first-of-type': {
                textDecoration: 'underline',
            },
        },
    },
    innerContainer: {
        position: 'absolute',
        zIndex: 500,
        backgroundColor: '#fff',
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        width: '145px',
        left: '50px',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        wordBreak: 'break-all',
    },
    title: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
    },
    description: {
        color: theme.palette.text.secondary,
        textDecoration: 'none',
        fontSize: 'inherit',
        WebkitLineClamp: 1,
        lineClamp: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
    },
}));
