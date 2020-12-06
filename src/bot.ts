import Twit, { Response } from 'twit';

const Twitter = new Twit(require('./config'));

const endivesHashtagSearch: Twit.Params = {
  q: '#endives',
  count: 100,
  result_type: 'recent',
};

const retweetLatest = () => {
  Twitter.get(
    'search/tweets',
    endivesHashtagSearch,
    (error: Error, data: any) => {
      if (!error) {
        const retweetId = data.statuses[0].id_str;
        Twitter.post(
          'statuses/retweet/' + retweetId,
          {},
          (error: Error, response: Response) => {
            if (response) {
              console.log('Success!');
            }
            if (error) {
              console.log('There was an error with Twitter:', error);
            }
          },
        );
      } else {
        console.log('There was an error with your hashtag search:', error);
      }
    },
  );
};

retweetLatest();
setInterval(retweetLatest, 1000 * 20);
