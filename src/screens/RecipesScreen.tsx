import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const RecipesScreen = () => {
  const recipes = [
    {
      id: '1',
      name: '珍珠奶茶',
      ingredients: [
        { name: '红茶', quantity: '300ml' },
        { name: '珍珠', quantity: '50g' },
        { name: '牛奶', quantity: '100ml' },
        { name: '糖浆', quantity: '30ml' },
      ],
      cost: 3.5,
      price: 15,
    },
    {
      id: '2',
      name: '布丁奶茶',
      ingredients: [
        { name: '绿茶', quantity: '300ml' },
        { name: '布丁', quantity: '60g' },
        { name: '牛奶', quantity: '100ml' },
        { name: '糖浆', quantity: '25ml' },
      ],
      cost: 4.0,
      price: 16,
    },
    {
      id: '3',
      name: '芋圆奶茶',
      ingredients: [
        { name: '乌龙茶', quantity: '300ml' },
        { name: '芋圆', quantity: '50g' },
        { name: '牛奶', quantity: '100ml' },
        { name: '糖浆', quantity: '35ml' },
      ],
      cost: 4.5,
      price: 18,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>饮品配方管理</Text>
        <Text style={styles.subtitle}>标准配方，保证出品一致性</Text>
      </View>

      {recipes.map((recipe) => (
        <Card key={recipe.id} style={styles.card}>
          <Card.Content>
            <View style={styles.recipeHeader}>
              <Title style={styles.recipeName}>{recipe.name}</Title>
              <View style={styles.priceContainer}>
                <Text style={styles.costText}>成本: ¥{recipe.cost}</Text>
                <Text style={styles.priceText}>售价: ¥{recipe.price}</Text>
                <Text style={styles.profitText}>
                  毛利: ¥{(recipe.price - recipe.cost).toFixed(1)}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionTitle}>原料配比：</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientRow}>
                <Text style={styles.ingredientName}>{ingredient.name}</Text>
                <Text style={styles.ingredientQuantity}>{ingredient.quantity}</Text>
              </View>
            ))}

            <View style={styles.profitMargin}>
              <Text style={styles.marginText}>
                毛利率: {(((recipe.price - recipe.cost) / recipe.price) * 100).toFixed(1)}%
              </Text>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button mode="outlined" style={styles.actionButton}>
              编辑
            </Button>
            <Button mode="contained" style={styles.actionButton}>
              复制配方
            </Button>
          </Card.Actions>
        </Card>
      ))}

      <Card style={styles.addCard}>
        <Card.Content>
          <Button mode="contained" icon="plus" style={styles.addButton}>
            添加新配方
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  card: {
    margin: 10,
    elevation: 3,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  recipeName: {
    fontSize: 18,
    color: '#333',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  costText: {
    fontSize: 12,
    color: '#666',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B8B',
    marginTop: 2,
  },
  profitText: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    marginTop: 10,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  ingredientName: {
    fontSize: 14,
    color: '#555',
  },
  ingredientQuantity: {
    fontSize: 14,
    color: '#888',
  },
  profitMargin: {
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  marginText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    textAlign: 'center',
  },
  actionButton: {
    marginHorizontal: 5,
    flex: 1,
  },
  addCard: {
    margin: 10,
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#FF6B8B',
  },
});

export default RecipesScreen;