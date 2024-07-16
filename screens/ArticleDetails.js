import React from 'react';
import {Text, Image, ScrollView, View} from 'react-native';
import {articles} from './data/articles';
import styles from './styles/articleDetails';

const ArticleDetails = ({route}) => {
  const {article} = route.params;
  const matchingArticle = articles.find(a => a.title === article.title);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Image source={article.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{article.title}</Text>
        {matchingArticle && (
          <View>
            <Text style={styles.paragraphContent}>{matchingArticle.intro}</Text>
            {matchingArticle.paragraphs.map((paragraph, index) => (
              <View key={index}>
                <Text style={styles.paragraphTitle}>{paragraph.paraTitle}</Text>
                <Text style={styles.paragraphContent}>{paragraph.content}</Text>
              </View>
            ))}
            <Text style={styles.paragraphContent}>
              {matchingArticle.conclusion}
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ArticleDetails;
