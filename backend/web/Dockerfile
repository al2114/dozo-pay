FROM ruby:2.5.0
RUN apt-get update\
  && apt-get install -y build-essential postgresql postgresql-contrib vim sudo \  
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*
RUN curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash - && sudo apt-get install -y nodejs
#RUN npm install -g phantomjs

# Cache bundle install
WORKDIR /tmp
COPY Gemfile Gemfile
COPY Gemfile.lock Gemfile.lock
RUN bundle install


ADD . /usr/src/app
WORKDIR /usr/src/app
RUN RAILS_ENV=production bundle exec rake assets:precompile --trace
CMD ["rails","server","-b","0.0.0.0"]

