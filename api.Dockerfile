FROM akraradets/base-ubuntu:22.04

WORKDIR /root/projects
EXPOSE 8000

RUN apt update && apt upgrade -y
RUN apt install -y python3 python3-pip

# GDAL
RUN apt install -y gdal-bin libgdal-dev
ENV CPLUS_INCLUDE_PATH=/usr/include/gdal
ENV C_INCLUDE_PATH=/usr/include/gdal
RUN pip3 install GDAL==3.4.1

# Other packages
RUN pip3 install ipykernel
RUN pip3 install ipywidgets
RUN pip3 install numpy
RUN pip3 install matplotlib
RUN pip3 install scikit-learn
RUN pip3 install pandas

RUN pip3 install basemap
RUN pip3 install rasterio
RUN pip3 install rioxarray
RUN pip3 install Fiona
RUN pip3 install geopandas

CMD tail -f /dev/null