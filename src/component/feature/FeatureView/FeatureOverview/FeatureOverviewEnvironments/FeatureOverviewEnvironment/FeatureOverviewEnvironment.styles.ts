import { makeStyles } from 'tss-react/mui';

export const useStyles = makeStyles()(theme => ({
    featureOverviewEnvironment: {
        borderRadius: '12.5px',
        padding: '0.2rem',
        marginBottom: '1rem',
        backgroundColor: '#fff',
    },
    accordionContainer: {
        width: '100%',
    },
    accordionHeader: {
        boxShadow: 'none',
        padding: '1rem 2rem',
        [theme.breakpoints.down(400)]: {
            padding: '0.5rem 1rem',
        },
    },
    accordionBodyInnerContainer: {
        [theme.breakpoints.down(400)]: {
            padding: '0.5rem',
        },
    },
    accordionBody: {
        width: '100%',
        position: 'relative',
        paddingBottom: '1rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        paddingTop: '1.5rem',
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down(560)]: {
            flexDirection: 'column',
            textAlign: 'center',
        },
    },
    headerIcon: {
        [theme.breakpoints.down(560)]: {
            marginBottom: '0.5rem',
        },
    },
    disabledIndicatorPos: {
        position: 'absolute',
        top: '15px',
        left: '20px',
        [theme.breakpoints.down(560)]: {
            top: '13px',
        },
    },
    iconContainer: {
        backgroundColor: theme.palette.primary.light,
        borderRadius: '50%',
        width: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '0.5rem',
    },
    icon: {
        fill: '#fff',
        width: '17px',
        height: '17px',
    },
    resultInfo: {
        display: 'flex',
        alignItems: 'center',
        margin: '1rem 0',
    },
    leftWing: {
        height: '2px',
        backgroundColor: theme.palette.grey[300],
        width: '90%',
    },
    separatorText: {
        fontSize: theme.fontSizes.smallBody,
        textAlign: 'center',
        padding: '0 1rem',
    },
    rightWing: {
        height: '2px',
        backgroundColor: theme.palette.grey[300],
        width: '90%',
    },
    linkContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '1rem',
    },
    truncator: {
        [theme.breakpoints.down(560)]: {
            textAlign: 'center',
        },
    },
    container: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '1.8rem',
        [theme.breakpoints.down(560)]: {
            flexDirection: 'column',
            marginLeft: '0',
        },
    },
}));
