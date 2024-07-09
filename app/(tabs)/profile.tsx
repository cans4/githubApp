import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RepoCard from '@/components/RepoCard/index';
interface Repo {
  id: number;
  name: string;
  stargazers_count: number;
  description: string;
}

export default function Tab() {

  const [bookmarkedRepos, setBookmarkedRepos] =  useState<Repo[]>([]);

  useEffect(() => {
    const fetchBookmarks = async () => {

      try {
        const bookmarks = await AsyncStorage.getItem('bookmarks');
        if (bookmarks) {
          setBookmarkedRepos(JSON.parse(bookmarks));
        }

      }
      catch(error) {
        console.error('Error fetching bookmarks: ', error);
      }
    };

    fetchBookmarks();
  }, [])
  

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {bookmarkedRepos.length === 0 ? (<Text> No bookmarked repositories yet.</Text>) 
        : (
          bookmarkedRepos.map((repo) => (
            <RepoCard 
              key={repo.id}
              repoName={repo.name}
              repoStars={repo.stargazers_count}
              repoDesc={repo.description}
              repoId={repo.id}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  scrollView: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
