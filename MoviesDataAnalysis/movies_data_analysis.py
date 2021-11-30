from datetime import datetime

INCORRECT_GENRES = {
    "Comdy": "Comedy",
    "comedy": "Comedy",
    "Romence": "Romance",
    "romance": "Romance"
}

SIMILAR_STUDIOS = {"Fox": "20th Century Fox"}

MENU_STRING = """Press 1 to see highest and lowest gross sale of each year
Press 2 to see highest and lowest audience score for each year
Press 3 to see the profit of all lead studios and the highest and lowest profiting lead studio
Press 4 to see highest and lowest gross sale for each genre for each year
Press 0 to exit the menu"""


def max_min_value_for_year(movies_list, year, value):
    max_value = float("-inf")
    min_value = float("inf")
    max_value_movie = None
    min_value_movie = None

    for movie in movies_list:
        if movie.year == year:
            float_value = float(movie.__getattribute__(value).replace("$", ""))

            if float_value > max_value:
                max_value = float_value
                max_value_movie = movie
            if float_value < min_value:
                min_value = float_value
                min_value_movie = movie

    return max_value_movie, min_value_movie


class Movie:
    def __init__(self, *args):
        self.film = args[0]
        self.genre = args[1]
        self.lead_studio = args[2]
        self.audience_score_percentage = args[3]
        self.profitability = args[4]
        self.rotten_tomatoes_percentage = args[5]
        self.worldwide_gross = args[6]
        self.year = args[7].replace("\n", "")


class MoviesData:
    movies_list = []

    def __init__(self, filepath):
        with open(filepath, "r", encoding="utf-8") as f:
            # Ignoring attribute names present on first line
            f.readline()

            for line in f.readlines():
                line_data = line.split(",")
                try:
                    movie_object = Movie(*line_data)
                except IndexError:
                    continue

                if movie_object:
                    movie_object.genre = INCORRECT_GENRES.get(movie_object.genre, movie_object.genre)
                    movie_object.lead_studio = SIMILAR_STUDIOS.get(movie_object.lead_studio, movie_object.lead_studio)

                    self.movies_list.append(movie_object)

    def highest_lowest_gross_sale(self):
        movie_years = []
        for movie in self.movies_list:
            if movie.year not in movie_years:
                movie_years.append(movie.year)

        if len(movie_years) == 0:
            return

        print("Highest and lowest world wide gross sale for each year")
        # Sorting movies year wise
        movie_years.sort()

        for year in movie_years:
            self.highest_lowest_gross_sale_for_year(year)

    def highest_lowest_gross_sale_for_year(self, year):
        # Handling different types of year argument being passed.
        year = str(year)

        max_gross_movie, min_gross_movie = max_min_value_for_year(self.movies_list, year, "worldwide_gross")

        if max_gross_movie is not None:
            print(f"For year {max_gross_movie.year}")
            print(f"Highest gross for year {max_gross_movie.year} is {max_gross_movie.worldwide_gross}of movie named ",
                  f"{max_gross_movie.film} produced by {max_gross_movie.lead_studio}", sep="")
        if min_gross_movie is not None:
            print(f"Lowest gross for year {min_gross_movie.year} is {min_gross_movie.worldwide_gross}",
                  f"of movie named {min_gross_movie.film} produced by {min_gross_movie.lead_studio}\n", sep="")

    def highest_lowest_audience_score(self):
        movie_years = []
        for movie in self.movies_list:
            if movie.year not in movie_years:
                movie_years.append(movie.year)

        if len(movie_years) == 0:
            return

        print("Highest and lowest audience score for each year")
        # Sorting movies year wise
        movie_years.sort()

        for year in movie_years:
            self.highest_lowest_audience_score_for_year(year)

    def highest_lowest_audience_score_for_year(self, year):
        # Handing different type of year being passed
        year = str(year)

        max_score_movie, min_score_movie = max_min_value_for_year(self.movies_list, year, "audience_score_percentage")

        if max_score_movie is not None:
            print("For year", max_score_movie.year)
            print(f"Highest audience score for year {max_score_movie.year} is",
                  f"{max_score_movie.audience_score_percentage} of movie named {max_score_movie.film}, produced by",
                  f"{max_score_movie.lead_studio}")
        if min_score_movie is not None:
            print(f"Lowest audience score for year  {min_score_movie.year} is",
                  f"{min_score_movie.audience_score_percentage} of movie named {min_score_movie.film}, produced by",
                  f"{min_score_movie.lead_studio}\n")

    def profit_of_all_lead_studio(self):
        lead_studios = []
        for movie in self.movies_list:
            if movie.lead_studio not in lead_studios:
                lead_studios.append(movie.lead_studio)

        max_profit = float("-inf")
        min_profit = float("inf")
        max_profit_studio = None
        min_profit_studio = None
        for studio in lead_studios:
            profit = self.profit_of_lead_studio_for_four_years(studio)

            if profit >= 0:
                if profit > max_profit:
                    max_profit = profit
                    max_profit_studio = studio
                if profit < min_profit:
                    min_profit = profit
                    min_profit_studio = studio

        if max_profit_studio is not None:
            print(f"\nHighest profit of ${max_profit} was gained by the studio {max_profit_studio}")
        if min_profit_studio is not None:
            print(f"Lowest profit of ${min_profit} was gained by the studio {min_profit_studio}\n")

        if max_profit_studio is None and min_profit_studio is None:
            print("\nNo lead studio data for past 4 years\n")

    def profit_of_lead_studio_for_four_years(self, lead_studio):
        profit = 0
        current_year = datetime.now().year
        # current_year = 2012
        current_year = int(current_year)

        flag = False
        for movie in self.movies_list:
            if movie.lead_studio == lead_studio and current_year - 4 <= int(movie.year) < current_year:
                flag = True
                profit += float(movie.profitability) / 100 * float(movie.worldwide_gross.replace("$", ""))

        if flag:
            print(f"Profit of lead studio {lead_studio} is ${profit}")
        else:
            profit = -1

        return profit

    def highest_lowest_gross_for_genres(self):
        movie_years = []
        genres = []
        for movie in self.movies_list:
            if movie.year not in movie_years:
                movie_years.append(movie.year)
            if movie.genre not in genres:
                genres.append(movie.genre)

        if len(movie_years) == 0:
            return

        print("Highest and lowest world wide gross sale for each year\n")
        # Sorting movies year wise
        movie_years.sort()

        for year in movie_years:
            max_gross = float("-inf")
            min_gross = float("inf")
            max_gross_genre = None
            min_gross_genre = None

            for genre in genres:
                gross_for_genre = self.gross_for_genre_for_year(year, genre)

                if gross_for_genre >= 0:
                    if gross_for_genre > max_gross:
                        max_gross = gross_for_genre
                        max_gross_genre = genre
                    if gross_for_genre < min_gross:
                        min_gross = gross_for_genre
                        min_gross_genre = genre

            print("For year", year)

            if max_gross_genre is not None:
                print(f"Highest profit of ${max_gross} of genre {max_gross_genre}")
            if min_gross_genre is not None:
                print(f"Lowest profit of ${min_gross} of genre {min_gross_genre}\n")

    def gross_for_genre_for_year(self, year, genre):
        # Handled all different data types of year
        year = str(year)

        worldwide_gross = 0
        flag = False
        for movie in self.movies_list:
            if movie.year == year and movie.genre == genre:
                flag = True
                worldwide_gross += float(movie.worldwide_gross.replace("$", ""))

        if not flag:
            worldwide_gross = -1

        return worldwide_gross


if __name__ == "__main__":

    movies = MoviesData("movies.csv")
    print("----------------------------Welcome to the Movies Data-----------------------------", MENU_STRING, sep="\n")

    # Taking input from user
    try:
        a = int(input())
    except ValueError:
        a = 5

    while a != 0:
        if a == 1:
            movies.highest_lowest_gross_sale()
        elif a == 2:
            movies.highest_lowest_audience_score()
        elif a == 3:
            movies.profit_of_all_lead_studio()
        elif a == 4:
            movies.highest_lowest_gross_for_genres()
        else:
            print("Incorrect option selected!!!")

        print(MENU_STRING, sep="\n")

        try:
            a = int(input())
        except ValueError:
            a = 5

    print("Exited the menu.")
