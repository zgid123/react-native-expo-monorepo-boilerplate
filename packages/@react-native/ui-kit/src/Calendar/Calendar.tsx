import { mergeDeep } from '@core/utils/remeda';
import {
  LocaleConfig,
  Calendar as RNCalendar,
  type CalendarProps,
} from 'react-native-calendars';

import type { JSX } from 'react';

import { Icon } from '../Icon';
import { useColor } from '../hooks';

export type { MarkedDates, DateData } from 'react-native-calendars/src/types';

function NoTitleHeader(): null {
  return null;
}

export interface ICalendarProps extends CalendarProps {
  isLoading?: boolean;
  showTitle?: boolean;
}

export function Calendar({
  isLoading,
  theme = {},
  markedDates = {},
  showTitle = false,
  ...rest
}: ICalendarProps): JSX.Element {
  const blackColor = useColor('black');
  const whiteColor = useColor('white');
  const gray100 = useColor('gray.100');
  const gray300 = useColor('gray.300');
  const brandPrimaryColor = useColor('teal.500');
  const brandSecondaryColor = useColor('teal.400');
  let additionalProps: CalendarProps = {};

  LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = [
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
  ];

  if (isLoading) {
    additionalProps = {
      onDayPress: undefined,
      disabledByDefault: isLoading,
      displayLoadingIndicator: isLoading,
      disabledDaysIndexes: [0, 1, 2, 3, 4, 5, 6],
      disableAllTouchEventsForInactiveDays: isLoading,
    };
  }

  return (
    <RNCalendar
      hideArrows
      firstDay={1}
      disableMonthChange
      monthFormat='MMMM yyyy'
      showWeekNumbers={false}
      customHeaderTitle={showTitle ? undefined : <NoTitleHeader />}
      markedDates={Object.entries(markedDates).reduce(
        (result, [key, value]) => {
          result[key] = {
            ...value,
            dotColor: brandPrimaryColor,
          };

          return result;
        },
        {},
      )}
      renderArrow={(direction) => {
        if (direction === 'left') {
          return <Icon name='arrow-left-thin' size={29} />;
        }

        return <Icon name='arrow-right-thin' size={29} />;
      }}
      theme={mergeDeep(
        {
          dayTextColor: blackColor,
          textMonthFontWeight: 'bold',
          dotColor: brandPrimaryColor,
          selectedDayTextColor: whiteColor,
          todayTextColor: brandSecondaryColor,
          selectedDotColor: brandPrimaryColor,
          selectedDayBackgroundColor: brandPrimaryColor,
          dotStyle: {
            width: 6,
            height: 6,
            marginTop: 8,
            marginBottom: 0,
            borderRadius: '100%',
            backgroundColor: brandPrimaryColor,
          },
          ...({
            'stylesheet.calendar.main': {
              container: {
                paddingLeft: 5,
                paddingRight: 5,
                backgroundColor: gray100,
              },
              monthView: {
                borderBottomWidth: 1,
                borderBottomColor: gray300,
              },
              dayContainer: {
                flex: 1,
                paddingTop: 9,
                paddingBottom: 2,
                borderTopWidth: 1,
                alignItems: 'center',
                position: 'relative',
                borderTopColor: gray300,
              },
              week: {
                marginVertical: 7,
                flexDirection: 'row',
                justifyContent: 'space-around',
              },
            },
          } as TAny),
        },
        theme as TAny,
      )}
      {...rest}
      {...additionalProps}
    />
  );
}
