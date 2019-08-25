# Pikasso

## Inspiration
Pikasso (Pic Association) was created because we believe in the value of photos, especially those of spaces which have a special meaning to individuals. Our goal is to uncover and analyze the subconscious mechanisms underlying our interests and lifestyle choices to connect users with others through machine learning. We hope to find connections in aspects not of the explicit nature, such as listing down interests and hobbies, but of the implicit.

## What it does
We take the uploaded photos and use AWS Rekognition to label distinct objects and assign them values based on a global table containing the number of occurrences of such objects from other photos. The idea is that we would weigh commonly seen objects such as a bed or a mug as less "interesting" thus being assigned a lower overall score while uncommon ones are deemed more "interesting" and given a higher score.

After every object has been given a score, we then normalize those values to be between 0-1 and directly proportionate to the score they were given previously. The user is then matched with people based on 2 criteria which work together and create a "matching percentage".

The first check is to see how many items were shared between the two users and the proximity of scores for every object found. The second check is to prioritize matches with items that have a higher score which would imply rarity in other users' photos. This allows us to filter out matches that share common household items while focusing on matches between users that share a unique item.

Finally, the results of the connections found are then displayed in an interactive dashboard which allows the user to learn more about the details of the matched profiles.

## How we built it
The web application is built using React while the server is written in Python using MongoDB to store the data. Additionally, we leveraged Amazon Web Services' object recognition API (Rekognition) to label objects identified in photos.

## Challenges we ran into
The bulk of our problems revolved around figuring out the math behind the algorithm as well as learning MongoDB when all the experience we've had so far had been with relational databases. We also had some trouble with integrating AWS Rekognition as well as sending images over HTTP requests.

## Accomplishments that we proud of
We're really proud to have built a fully-functioning application that fulfilled what we set out to achieve. This idea could be expanded and improved in terms of implementation, but it's amazing to see a viable proof of concept for a project we want to continue working on after this event.

## What we learned
At previous hackathons, we've experienced being overly ambitious when thinking about an idea. This time we did research beforehand and agreed on an idea that we could realistically implement as a minimal viable product while also having enough of a ceiling to grow and add additional features if we had time. Technology-wise we picked up some experience integrating AI into our application and knowledge about AWS.

## What's next for Pikasso
We see Pikasso as a working proof of concept for an extremely scalable idea. Direct next steps would be to improve the matching algorithm to take into account other factors that may increase interesting matches to discover others who share the same passion. With the core concept of Pikasso being that photos can capture the lifestyle and interests of an individual, we hope to find less explicit ways of collecting data from photos such as scraping from the user's social media and using machine learning to match with other like-minded individuals.
