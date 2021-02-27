-- Вывод информации в профиль

SELECT 
    users.login, users.avatar,
    locations.name,
    -- reviews_count_query.reviews_count,
    -- reviews_rating_query.vote_sum,
    reviews_count_query.reviews_count * 100 + reviews_rating_query.vote_sum AS rating
FROM
    users
LEFT OUTER JOIN
    (SELECT login, COUNT(id) AS reviews_count FROM reviews GROUP BY (login)) AS reviews_count_query
ON reviews_count_query.login = users.login
LEFT OUTER JOIN 
    reviews
ON reviews.login = users.login
LEFT OUTER JOIN 
    locations 
ON locations.id = users.location
INNER JOIN  
    (SELECT SUM(vote) AS vote_sum FROM review_stats WHERE review IN (SELECT id FROM reviews WHERE login = users.login) GROUP BY(review_stats.review)) AS reviews_rating_query
ON reviews_rating_query.review = reviews.id 
WHERE users.login = 'admin'
GROUP BY (users.login, users.avatar, locations.name, rating);




SELECT 
fishes.id, fishes.name,
-- methods.id, methods.name,
COUNT(facts.fish) AS topfishes
-- COUNT(methods.id) AS methods
FROM
reviews
LEFT OUTER JOIN
facts
ON facts.review = reviews.id
LEFT OUTER JOIN  
fishes 
ON fishes.id = facts.fish
LEFT OUTER JOIN 
methods
ON methods.id = facts.method
WHERE reviews.login = 'admin'
GROUP BY (fishes.id, fishes.name)
HAVING COUNT(facts.fish) = (SELECT MAX(fish_count) FROM
(SELECT facts.fish AS fish, COUNT(facts.fish) AS fish_count 
FROM facts 
GROUP BY facts.fish) AS sub)
;

SELECT MAX(fish_count) FROM
(SELECT facts.fish AS fish, COUNT(facts.fish) AS fish_count 
FROM facts 
GROUP BY facts.fish) AS sub;

SELECT reviews.login, reviews.id, facts.id, fishes.id, fishes.name 
FROM
reviews
INNER JOIN
facts 
ON
facts.review = reviews.id
INNER JOIN
fishes
ON 
fishes.id = facts.fish
INNER JOIN
(SELECT facts.fish, COUNT(facts.fish) FROM )
WHERE reviews.login = 'admin';