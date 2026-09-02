---
title: "Dealing with Daylight Saving Time in Scala/Java"
date: 2022-07-07T17:32:50.459Z
slug: "dealing-with-daylight-saving-time"
status: published
tags: ["Scala", "Java", "time"]
---

Handing daylight saving time programmatically can be tricky. It could create a mini Y2K problem twice a year when done incorrectly.

If you want to get the current [LocalDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html) in a different time zone, the best approach is to use an [Instant](https://docs.oracle.com/javase/8/docs/api/java/time/Instant.html) and then convert it to a [ZonedDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/ZonedDateTime.html).
Use [ZonedDateTime.toLocalDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/ZonedDateTime.html#toLocalDateTime--) to extract the [LocalDateTime](https://docs.oracle.com/javase/8/docs/api/java/time/LocalDateTime.html) part of this date-time.

The example below shows how clocks were turned forward and backward an hour in [java.time](https://docs.oracle.com/javase/8/docs/api/java/time/package-summary.html) during DST changes in 2022.

```scala
import java.time.{ZoneId, ZonedDateTime, LocalDateTime, Instant}
import java.time.temporal.ChronoUnit

val halfAnHourBeforeDstStarted = Instant.parse("2022-03-13T07:30:00.00Z")
val halfAnHourBeforeDstEnds = Instant.parse("2022-11-06T06:30:00.00Z")

/*
Mar 13, 2022 - Daylight Saving Time Started
Sunday, March 13, 2022, 2:00:00 am clocks were turned forward 1 hour to
Sunday, March 13, 2022, 3:00:00 am local daylight time instead.
 */
halfAnHourBeforeDstStarted.atZone(ZoneId.of("US/Central")).toLocalDateTime
// = 2022-03-13T01:30
halfAnHourBeforeDstStarted
  .plus(1, ChronoUnit.HOURS)
  .atZone(ZoneId.of("US/Central"))
  .toLocalDateTime
// = 2022-03-13T03:30

/*
Nov 6, 2022 - Daylight Saving Time Ends
Sunday, November 6, 2022, 2:00:00 am clocks are turned backward 1 hour to
Sunday, November 6, 2022, 1:00:00 am local standard time instead.
 */
halfAnHourBeforeDstEnds.atZone(ZoneId.of("US/Central")).toLocalDateTime
// = 2022-11-06T01:30
halfAnHourBeforeDstEnds
  .plus(1, ChronoUnit.HOURS)
  .atZone(ZoneId.of("US/Central"))
  .toLocalDateTime
// = 2022-11-06T01:30
```

reference: https://www.timeanddate.com/time/change/usa
