FROM python:3.7-slim-buster as base

ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
ENV FLASK_APP flaskballs

RUN apt-get update && \
    apt-get install -y build-essential

COPY ./requirements.txt ./
RUN pip3 install --upgrade pip && \
    pip3 install -r requirements.txt

RUN mkdir -p /flaskballs
COPY ./flaskballs /flaskballs
WORKDIR /flaskballs
RUN chmod +x flask_wrapper.sh

CMD ["./flask_wrapper.sh"]

