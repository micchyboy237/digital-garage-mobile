import os


def rename_icon_files_in_directory(directory):
    for filename in os.listdir(directory):
        # Check if the file starts with the unwanted prefix
        if filename.startswith("🦆 icon _"):
            # Remove the prefix
            new_filename = filename.replace("🦆 icon _", "")

            # If the file has the unwanted suffix with @2x or @3x, handle those cases
            if new_filename.endswith("_@2x.png"):
                new_filename = new_filename.replace("_@2x.png", "@2x.png")
            elif new_filename.endswith("_@3x.png"):
                new_filename = new_filename.replace("_@3x.png", "@3x.png")
            elif new_filename.endswith("_.png"):
                # Handle the case without @2x or @3x
                new_filename = new_filename.replace("_.png", ".png")

            # Build full file paths
            old_file = os.path.join(directory, filename)
            new_file = os.path.join(directory, new_filename)

            # Rename the file
            os.rename(old_file, new_file)
            print(f'Renamed: "{filename}" to "{new_filename}"')


def _log_files_in_directory(directory):
    for filename in os.listdir(directory):
        print(f'Found: "{filename}"')


if __name__ == "__main__":
    # Use the current directory
    current_directory = os.getcwd()
    # Join the current directory with "../assets/icons/user"
    directory = "/Users/jethroestrada/Desktop/External_Projects/DigitalGarage/mobile/assets/icons/user"
    _log_files_in_directory(directory)
    rename_icon_files_in_directory(current_directory)
