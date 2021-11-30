import os
import argparse

from datetime import datetime


class WeatherData:
    def __init__(self, **kwargs):

        self.PKT = kwargs["date"]
        self.max_temp = kwargs["max_temperature"]
        self.mean_temp = kwargs["mean_temp"]
        self.min_temp = kwargs["min_temperature"]
        self.max_dew_point = kwargs["max_dew_point"]
        self.mean_dew_point = kwargs["mean_dew_point"]
        self.min_dew_point = kwargs["min_dew_point"]
        self.max_humidity = kwargs["max_hum"]
        self.mean_humidity = kwargs["mean_humidity"]
        self.min_humidity = kwargs["min_humidity"]
        self.max_sea_level = kwargs["max_sea_level"]
        self.mean_sea_level = kwargs["mean_sea_level"]
        self.min_sea_level = kwargs["min_sea_level"]
        self.max_visibility = kwargs["max_visibility"]
        self.mean_visibility = kwargs["mean_visibility"]
        self.min_visibility = kwargs["min_visibility"]
        self.max_wind_speed = kwargs["max_wind_speed"]
        self.mean_wind_speed = kwargs["mean_wind_speed"]
        self.max_gust = kwargs["max_gust"]
        self.precipitation = kwargs["precipitation"]
        self.cloud_cover = kwargs["cloud_cover"]
        self.events = kwargs["events"]
        self.wind_direction = kwargs["wind_direction"]


class MonthWeatherData:
    monthly_weather_data = []

    def __init__(self, file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            # Skipping first line containing attribute names
            f.readline()

            for line in f.readlines():
                line_data = line.split(",")

                try:
                    kwargs = {"date": line_data[0], "max_temperature": line_data[1], "mean_temp": line_data[2],
                              "min_temperature": line_data[3], "max_dew_point": line_data[4],
                              "mean_dew_point": line_data[5], "min_dew_point": line_data[6], "max_hum": line_data[7],
                              "mean_humidity": line_data[8], "min_humidity": line_data[9],
                              "max_sea_level": line_data[10], "mean_sea_level": line_data[11],
                              "min_sea_level": line_data[12], "max_visibility": line_data[13],
                              "mean_visibility": line_data[14], "min_visibility": line_data[15],
                              "max_wind_speed": line_data[16], "mean_wind_speed": line_data[17],
                              "max_gust": line_data[18], "precipitation": line_data[19], "cloud_cover": line_data[20],
                              "events": line_data[21], "wind_direction": line_data[22]}
                except IndexError:
                    continue

                try:
                    temp_weather_obj = WeatherData(**kwargs)
                except KeyError:
                    continue

                self.monthly_weather_data.append(temp_weather_obj)
                self.month_name = datetime.strptime(temp_weather_obj.PKT.split("-")[1], "%m").strftime("%B")

    def get_max_temp(self):
        max_temperature_date = None
        max_temperature = float("-inf")
        for day in self.monthly_weather_data:
            if day.max_temp and float(day.max_temp) > max_temperature:
                max_temperature = int(day.max_temp)
                max_temperature_date = day.PKT

        return max_temperature_date, max_temperature

    def get_min_temp(self):
        min_temperature_date = None
        min_temperature = float("inf")
        for day in self.monthly_weather_data:
            if day.min_temp and float(day.min_temp) < min_temperature:
                min_temperature = int(day.min_temp)
                min_temperature_date = day.PKT

        return min_temperature_date, min_temperature

    def get_max_humidity(self):
        max_humid_date = None
        max_humid = float("-inf")
        for day in self.monthly_weather_data:
            if day.max_humidity and float(day.max_humidity) > max_humid:
                max_humid = int(day.max_humidity)
                max_humid_date = day.PKT

        return max_humid_date, max_humid

    def get_max_avg_temp(self):
        max_avg_temperature = float("-inf")
        for day in self.monthly_weather_data:
            if day.mean_temp and float(day.mean_temp) > max_avg_temperature:
                max_avg_temperature = int(day.mean_temp)

        return max_avg_temperature

    def get_min_avg_temp(self):
        min_avg_temperature = float("inf")
        for day in self.monthly_weather_data:
            if day.mean_temp and float(day.mean_temp) < min_avg_temperature:
                min_avg_temperature = int(day.mean_temp)

        return min_avg_temperature

    def get_avg_mean_humidity(self):
        sum_mean_humidity = 0
        count = 0
        for day in self.monthly_weather_data:
            if day.mean_humidity:
                sum_mean_humidity += int(day.mean_humidity)
                count += 1

        avg_mean_humidity = sum_mean_humidity / count if count > 0 else 0

        return avg_mean_humidity


def get_file_by_month(date, file_path):
    year_month = date.split("/")
    name_of_month = datetime.strptime(year_month[1], "%m").strftime("%b")
    month_info = year_month[0] + "_" + name_of_month

    month_file = None
    for file in os.listdir(file_path):
        if month_info in file:
            month_file = file

    return month_info, month_file


def temperature_for_year(year, filepath):
    year_wise_files = [file for file in os.listdir(filepath) if year in file]

    # Initialize weather list
    yearly_weather_data = []
    for file in year_wise_files:
        month_data = MonthWeatherData(filepath + file)
        yearly_weather_data.append(month_data)

    max_temp_date = None
    max_humidity_date = None
    min_temp_date = None
    max_temp = float("-inf")
    max_humidity = float("-inf")
    min_temp = float("inf")
    for month_data in yearly_weather_data:
        max_month_temp_date, max_month_temp = month_data.get_max_temp()
        min_month_temp_date, min_month_temp = month_data.get_min_temp()
        max_month_hum_date, max_month_hum = month_data.get_max_humidity()

        if max_month_temp > max_temp:
            max_temp = max_month_temp
            max_temp_date = max_month_temp_date
        if min_month_temp < min_temp:
            min_temp = min_month_temp
            min_temp_date = min_month_temp_date
        if max_month_hum > max_humidity:
            max_humidity = max_month_hum
            max_humidity_date = max_month_hum_date

    if max_temp_date is not None and min_temp_date is not None and max_humidity_date is not None:
        print("Temperature by day for a given year:", year)

        max_temp_day = datetime.strptime(max_temp_date, "%Y-%m-%d")
        min_temp_day = datetime.strptime(min_temp_date, "%Y-%m-%d")
        max_humidity_day = datetime.strptime(max_humidity_date, "%Y-%m-%d")

        print("Highest: ", max_temp, "C on ", max_temp_day.strftime("%B"), " ", max_temp_day.day, sep="")
        print("Lowest: ", min_temp, "C on ", min_temp_day.strftime("%B"), " ", min_temp_day.day, sep="")
        print("Humid: ", max_humidity, "% on ", max_humidity_day.strftime("%B"), " ", max_humidity_day.day, sep="")


def average_temperature_for_month(month_date, filepath):
    # Obtaining month's file
    month_string, month_data_file = get_file_by_month(month_date, filepath)

    if month_data_file:

        # Initializing MonthWeatherData object
        month_data = MonthWeatherData(filepath + month_data_file)

        max_temp_avg = month_data.get_max_avg_temp()
        min_temp_avg = month_data.get_min_avg_temp()
        avg_hum = month_data.get_avg_mean_humidity()

        if max_temp_avg != float("-inf") and min_temp_avg != float("inf"):
            print("Average temperature for the month:", month_string)
            print("Highest Average: ", max_temp_avg, "C", sep="")
            print("Lowest Average: ", min_temp_avg, "C", sep="")
            print("Average Humid: ", avg_hum, "%", sep="")
            print(month_data.month_name)
    else:
        # Error message in case given year is not in the files.
        print("No data for year:", month_string)


def two_horizontal_charts(month_date, filepath):
    # Obtaining month's file
    month_string, month_data_file = get_file_by_month(month_date, filepath)

    if month_data_file:
        print("Two horizontal bar charts for temperature of each day", month_string)

        # Initializing MonthWeatherData object
        month_data = MonthWeatherData(filepath + month_data_file)

        if len(month_data.monthly_weather_data) > 0:
            print("Two horizontal bar charts for temperature of each day of", month_string)

        for weather_obj in month_data.monthly_weather_data:
            day_number = datetime.strptime(weather_obj.PKT, "%Y-%m-%d").day

            if weather_obj.max_temp:
                print(f"{day_number:02d}", " \033[0;31m", "+" * int(weather_obj.max_temp), "\033[0m ",
                      int(weather_obj.max_temp), "C", sep="")
            if weather_obj.min_temp:
                print(f"{day_number:02d}", " \033[0;34m", "+" * int(weather_obj.min_temp), "\033[0m ",
                      int(weather_obj.min_temp), "C", sep="")

        print(month_data.month_name)
    else:
        # Error message in case given year is not in the files.
        print("No data for year:", month_string)


def one_horizontal_chart(month_date, filepath):
    # Obtaining month's file
    month_string, month_data_file = get_file_by_month(month_date, filepath)

    if month_data_file:
        print("One horizontal bar charts for temperature of each day", month_string)

        # Initializing MonthWeatherData object
        month_data = MonthWeatherData(filepath + month_data_file)

        if len(month_data.monthly_weather_data) > 0:
            print("One horizontal bar chart for temperature of each day of", month_string)

        for weather_obj in month_data.monthly_weather_data:
            max_temp = 0
            min_temp = 0
            day_number = datetime.strptime(weather_obj.PKT, "%Y-%m-%d").day

            if weather_obj.max_temp:
                max_temp = int(weather_obj.max_temp)
            if weather_obj.min_temp:
                min_temp = int(weather_obj.min_temp)
            if max_temp > 0 and min_temp > 0:
                print(f"{day_number:02d}", "\033[0;34m ", "+" * min_temp, "\033[0;31m", "+" * max_temp,
                      "\033[0m ", min_temp, "C-", max_temp, "C", sep="")

        print(month_data.month_name)
    else:
        # Error message in case given year is not in the files.
        print("No data for year:", month_string)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument("-e", help="Temperature by day for a given year")
    parser.add_argument("-a", help="Average temperature for a given month")
    parser.add_argument("-c", help="Two horizontal bar charts for temperature of each day")
    parser.add_argument("-C", help="One horizontal bar charts for temperature of each day")
    parser.add_argument("path_to_files")

    args = parser.parse_args()

    if args.e:
        temperature_for_year(args.e, args.path_to_files)
    elif args.a:
        average_temperature_for_month(args.a, args.path_to_files)
    elif args.c:
        two_horizontal_charts(args.c, args.path_to_files)
    elif args.C:
        one_horizontal_chart(args.C, args.path_to_files)
    else:
        print("No argument passed.")
