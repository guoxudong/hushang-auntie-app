import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import {
  Card,
  Title,
  TextInput,
  Button,
  SegmentedButtons,
  RadioButton,
  HelperText,
} from 'react-native-paper';

const AddMaterialScreen = ({ route, navigation }: any) => {
  const isEdit = route.params?.material;
  const initialMaterial = route.params?.material || {
    name: '',
    category: '配料',
    currentStock: 0,
    minStock: 0,
    maxStock: 0,
    unit: 'kg',
    cost: 0,
    supplier: '',
    usageRate: 0,
    shelfLife: 0,
    location: '',
  };

  const [material, setMaterial] = useState(initialMaterial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    { value: '配料', label: '配料' },
    { value: '茶叶', label: '茶叶' },
    { value: '奶制品', label: '奶制品' },
    { value: '糖类', label: '糖类' },
    { value: '包装', label: '包装' },
    { value: '其他', label: '其他' },
  ];

  const units = [
    { value: 'kg', label: '千克 (kg)' },
    { value: 'g', label: '克 (g)' },
    { value: 'L', label: '升 (L)' },
    { value: 'ml', label: '毫升 (ml)' },
    { value: '个', label: '个' },
    { value: '包', label: '包' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!material.name.trim()) {
      newErrors.name = '请输入物料名称';
    }

    if (material.minStock < 0) {
      newErrors.minStock = '安全库存不能为负数';
    }

    if (material.maxStock <= 0) {
      newErrors.maxStock = '最大库存必须大于0';
    }

    if (material.maxStock < material.minStock) {
      newErrors.maxStock = '最大库存不能小于安全库存';
    }

    if (material.currentStock < 0) {
      newErrors.currentStock = '当前库存不能为负数';
    }

    if (material.cost < 0) {
      newErrors.cost = '成本不能为负数';
    }

    if (material.usageRate < 0) {
      newErrors.usageRate = '日均使用量不能为负数';
    }

    if (material.shelfLife <= 0) {
      newErrors.shelfLife = '保质期必须大于0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        '确认',
        isEdit ? '确定要更新物料信息吗？' : '确定要添加新物料吗？',
        [
          { text: '取消', style: 'cancel' },
          {
            text: '确定',
            onPress: () => {
              // 这里应该是API调用，这里只是模拟
              console.log('保存物料:', material);
              Alert.alert(
                '成功',
                isEdit ? '物料信息已更新！' : '新物料已添加！',
                [
                  {
                    text: '确定',
                    onPress: () => navigation.goBack(),
                  },
                ]
              );
            },
          },
        ]
      );
    }
  };

  const handleDelete = () => {
    Alert.alert(
      '删除确认',
      '确定要删除这个物料吗？此操作不可恢复。',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '删除',
          style: 'destructive',
          onPress: () => {
            console.log('删除物料:', material.id);
            Alert.alert('成功', '物料已删除！', [
              {
                text: '确定',
                onPress: () => navigation.navigate('InventoryMain'),
              },
            ]);
          },
        },
      ]
    );
  };

  const updateField = (field: string, value: any) => {
    setMaterial({ ...material, [field]: value });
    // 清除该字段的错误
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>
            {isEdit ? '编辑物料信息' : '添加新物料'}
          </Title>

          <TextInput
            label="物料名称 *"
            value={material.name}
            onChangeText={(text) => updateField('name', text)}
            style={styles.input}
            mode="outlined"
            error={!!errors.name}
          />
          <HelperText type="error" visible={!!errors.name}>
            {errors.name}
          </HelperText>

          <Text style={styles.label}>分类 *</Text>
          <SegmentedButtons
            value={material.category}
            onValueChange={(value) => updateField('category', value)}
            buttons={categories}
            style={styles.segmentedButtons}
          />

          <Text style={styles.label}>单位 *</Text>
          <SegmentedButtons
            value={material.unit}
            onValueChange={(value) => updateField('unit', value)}
            buttons={units}
            style={styles.segmentedButtons}
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <TextInput
                label="当前库存"
                value={material.currentStock.toString()}
                onChangeText={(text) => updateField('currentStock', parseFloat(text) || 0)}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                error={!!errors.currentStock}
              />
              <HelperText type="error" visible={!!errors.currentStock}>
                {errors.currentStock}
              </HelperText>
            </View>
            <View style={styles.halfInput}>
              <TextInput
                label="成本 (元)"
                value={material.cost.toString()}
                onChangeText={(text) => updateField('cost', parseFloat(text) || 0)}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                error={!!errors.cost}
              />
              <HelperText type="error" visible={!!errors.cost}>
                {errors.cost}
              </HelperText>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <TextInput
                label="安全库存 *"
                value={material.minStock.toString()}
                onChangeText={(text) => updateField('minStock', parseFloat(text) || 0)}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                error={!!errors.minStock}
              />
              <HelperText type="error" visible={!!errors.minStock}>
                {errors.minStock}
              </HelperText>
            </View>
            <View style={styles.halfInput}>
              <TextInput
                label="最大库存 *"
                value={material.maxStock.toString()}
                onChangeText={(text) => updateField('maxStock', parseFloat(text) || 0)}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                error={!!errors.maxStock}
              />
              <HelperText type="error" visible={!!errors.maxStock}>
                {errors.maxStock}
              </HelperText>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <TextInput
                label="日均使用量"
                value={material.usageRate.toString()}
                onChangeText={(text) => updateField('usageRate', parseFloat(text) || 0)}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                error={!!errors.usageRate}
              />
              <HelperText type="error" visible={!!errors.usageRate}>
                {errors.usageRate}
              </HelperText>
            </View>
            <View style={styles.halfInput}>
              <TextInput
                label="保质期 (天) *"
                value={material.shelfLife.toString()}
                onChangeText={(text) => updateField('shelfLife', parseFloat(text) || 0)}
                style={styles.input}
                mode="outlined"
                keyboardType="numeric"
                error={!!errors.shelfLife}
              />
              <HelperText type="error" visible={!!errors.shelfLife}>
                {errors.shelfLife}
              </HelperText>
            </View>
          </View>

          <TextInput
            label="供应商"
            value={material.supplier}
            onChangeText={(text) => updateField('supplier', text)}
            style={styles.input}
            mode="outlined"
          />

          <TextInput
            label="存放位置"
            value={material.location}
            onChangeText={(text) => updateField('location', text)}
            style={styles.input}
            mode="outlined"
            placeholder="例如：A区-3号货架"
          />

          <View style={styles.preview}>
            <Text style={styles.previewTitle}>库存预览</Text>
            {material.maxStock > 0 && (
              <>
                <Text style={styles.previewText}>
                  库存比例: {((material.currentStock / material.maxStock) * 100).toFixed(1)}%
                </Text>
                <Text style={styles.previewText}>
                  建议订货量: {Math.max(0, material.maxStock - material.currentStock)} {material.unit}
                </Text>
                {material.usageRate > 0 && (
                  <Text style={styles.previewText}>
                    预计可用天数: {Math.floor(material.currentStock / material.usageRate)} 天
                  </Text>
                )}
              </>
            )}
          </View>
        </Card.Content>
      </Card>

      <View style={styles.actions}>
        <Button
          mode="contained"
          icon={isEdit ? 'check' : 'plus'}
          onPress={handleSubmit}
          style={styles.saveButton}
        >
          {isEdit ? '更新物料' : '添加物料'}
        </Button>

        {isEdit && (
          <Button
            mode="outlined"
            icon="delete"
            onPress={handleDelete}
            style={styles.deleteButton}
            textColor="#FF5252"
          >
            删除物料
          </Button>
        )}

        <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.cancelButton}
        >
          取消
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 5,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    marginTop: 10,
  },
  segmentedButtons: {
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  preview: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  previewText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  actions: {
    padding: 10,
    marginBottom: 20,
  },
  saveButton: {
    marginBottom: 10,
    backgroundColor: '#FF6B8B',
  },
  deleteButton: {
    marginBottom: 10,
    borderColor: '#FF5252',
  },
  cancelButton: {
    marginBottom: 10,
    borderColor: '#666',
  },
});

export default AddMaterialScreen;