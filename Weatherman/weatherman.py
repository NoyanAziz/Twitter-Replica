import os
import argparse
from datetime import datetime


def populate_data_from_file(file_path, data):
    file_data = []
    with open(file_path, "r", encoding="utf-8") as f:
        for line in f.readlines():
            line_data = line.split(",")
            file_data.append(line_data)

    attributes = file_data[0]

    for row in file_data[1:]:
        for i in range(len(row)):
            if i == 0:
                data[row[i]] = {}
            else:
                data[row[0]][attributes[i].lstrip(" ").rstrip("\n")] = row[i].rstrip("\n")

    return data


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

    # year_wise_files extracted from the directory
    year_wise_files = [file for file in os.listdir(filepath) if year in file]

    if year_wise_files:
        # Populating weather_data dictionary
        weather_data = {}
        for file in year_wise_files:
            weather_data = populate_data_from_file(filepath + file, weather_data)

        max_temp_date = None
        min_temp_date = None
        max_hum_date = None
        max_temp = float("-inf")
        min_temp = float("inf")
        max_hum = float("-inf")
        for day in weather_data:
            for each_attribute in weather_data[day].keys():
                if "Event" not in each_attribute and weather_data[day][each_attribute]:
                    float_value = float(weather_data[day][each_attribute])

                    if "maxtemp" in each_attribute.lower().replace(" ", "") and float_value > max_temp:
                        max_temp = int(float_value)
                        max_temp_date = day
                    if "mintemp" in each_attribute.lower().replace(" ", "") and float_value < min_temp:
                        min_temp = int(float_value)
                        min_temp_date = day
                    if "maxhum" in each_attribute.lower().replace(" ", "") and float_value > max_hum:
                        max_hum = int(float_value)
                        max_hum_date = day

        if max_temp_date is not None and min_temp_date is not None and max_hum_date is not None:
            print("Temperature by day for a given year:", year)

            max_temp_day = datetime.strptime(max_temp_date, "%Y-%m-%d")
            min_temp_day = datetime.strptime(min_temp_date, "%Y-%m-%d")
            max_hum_day = datetime.strptime(max_hum_date, "%Y-%m-%d")

            print("Highest: ", max_temp, "C on ", max_temp_day.strftime("%B"), " ", max_temp_day.day, sep="")
            print("Lowest: ", min_temp, "C on ", min_temp_day.strftime("%B"), " ", min_temp_day.day, sep="")
            print("Humid: ", max_hum, "% on ", max_hum_day.strftime("%B"), " ", max_hum_day.day, sep="")
    else:
        # Error message in case given year is not in the files.
        print("No data for year:", year)


def average_temperature_for_month(month_date, filepath):
    # Obtaining month's file
    month_string, month_data_file = get_file_by_month(month_date, filepath)

    if month_data_file:

        # Populating weather_data dictionary
        weather_data = populate_data_from_file(filepath + month_data_file, {})

        max_temp_avg = float("-inf")
        min_temp_avg = float("inf")
        sum_hum = 0
        hum_total = 0
        for day in weather_data:
            for each_attribute in weather_data[day].keys():
                if "Event" not in each_attribute and weather_data[day][each_attribute]:
                    float_value = float(weather_data[day][each_attribute])

                    if "meantemp" in each_attribute.lower().replace(" ", "") and float_value > max_temp_avg:
                        max_temp_avg = int(float_value)
                    if "meantemp" in each_attribute.lower().replace(" ", "") and float_value < min_temp_avg:
                        min_temp_avg = int(float_value)
                    if "meanhum" in each_attribute.lower().replace(" ", ""):
                        sum_hum += int(float_value)
                        hum_total += 1

        avg_hum = sum_hum / hum_total if hum_total != 0 else 0

        if max_temp_avg != float("-inf") and min_temp_avg != float("inf"):
            print("Average temperature for the month:", month_string)
            print("Highest Average: ", max_temp_avg, "C", sep="")
            print("Lowest Average: ", min_temp_avg, "C", sep="")
            print("Average Humid: ", avg_hum, "%", sep="")
    else:
        # Error message in case given year is not in the files.
        print("No data for year:", month_string)


def two_horizontal_charts(month_date, filepath):
    # Obtaining month's file
    month_string, month_data_file = get_file_by_month(month_date, filepath)

    if month_data_file:
        # Populating weather_data dictionary
        weather_data = populate_data_from_file(filepath + month_data_file, {})

        if len(weather_data) > 0:
            print("Two horizontal bar charts for temperature of each day of", month_string)

        for day in weather_data:
            for each_attribute in weather_data[day].keys():
                if "Event" not in each_attribute and weather_data[day][each_attribute]:
                    float_value = float(weather_data[day][each_attribute])
                    day_number = datetime.strptime(day, "%Y-%m-%d").day

                    if "maxtemp" in each_attribute.lower().replace(" ", ""):
                        print(f"{day_number:02d}", " \033[0;31m", "+" * int(float_value), "\033[0m ",
                              int(float_value), "C", sep="")
                    if "mintemp" in each_attribute.lower().replace(" ", ""):
                        print(f"{day_number:02d}", " \033[0;34m", "+" * int(float_value), "\033[0m ",
                              int(float_value), "C", sep="")
    else:
        # Error message in case given year is not in the files.
        print("No data for year:", month_string)


def one_horizontal_chart(month_date, filepath):
    # Obtaining month's file
    month_string, month_data_file = get_file_by_month(month_date, filepath)

    if month_data_file:
        # Populating weather_data dictionary
        weather_data = populate_data_from_file(filepath + month_data_file, {})

        if len(weather_data) > 0:
            print("One horizontal bar charts for temperature of each day of", month_string)

        for day in weather_data:
            day_number = datetime.strptime(day, "%Y-%m-%d").day

            min_temp = 0
            max_temp = 0
            for each_attribute in weather_data[day].keys():
                if "Event" not in each_attribute and weather_data[day][each_attribute]:
                    float_value = float(weather_data[day][each_attribute])

                    if "maxtemp" in each_attribute.lower().replace(" ", ""):
                        max_temp = int(float_value)
                    if "mintemp" in each_attribute.lower().replace(" ", ""):
                        min_temp = int(float_value)

            if min_temp > 0 or max_temp > 0:
                print(f"{day_number:02d}", "\033[0;34m ", "+" * min_temp,
                      "\033[0;31m", "+" * max_temp,
                      "\033[0m ", min_temp, "C-", max_temp, "C", sep="")
    else:
        # Error message in case given year is not in the files.
        print("No data for year:", month_string)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument("-e", help="Temperature by day for a given year")
    parser.add_argument("-a", help="Average temperature for a given month")
    parser.add_argument("-c", help="2 horizontal bar charts for temperature of each day")
    parser.add_argument("-C", help="1 horizontal bar charts for temperature of each day")
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
        print("No argument passed")
