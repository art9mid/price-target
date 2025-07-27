import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
} from 'react-native';
import { useState } from 'react';
import { moderateScale } from 'react-native-size-matters';
import PriceTarget from './components/PriceTarget/PriceTarget';
import { fetchPriceTarget, PriceTargetData } from './api/price-target';

const App = () => {
  const [symbol, setSymbol] = useState('');
  const [data, setData] = useState<PriceTargetData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>('');

  const fetchData = async (inputSymbol: string) => {
    if (!inputSymbol.trim()) {
      setData(null);
      setError(null);
      return;
    }
    try {
      setLoading(true);
      const response = await fetchPriceTarget(inputSymbol);
      setData(response);
      setError(null);
    } catch (err) {
      setError(String(err));
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Text style={styles.title}>Price Target Chart</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter symbol"
          value={symbol}
          onChangeText={setSymbol}
          autoCapitalize="characters"
          autoCorrect={false}
          onSubmitEditing={() => fetchData(symbol)}
          editable={!loading}
        />
        {loading && <ActivityIndicator size={'large'} />}
        {!!error && <Text style={styles.error}>{error}</Text>}
        {!error && data && (
          <>
            <View style={styles.header}>
              {data.logo_url && (
                <Image source={{ uri: data.logo_url }} style={styles.logo} />
              )}
              <Text style={styles.symbol}>{data.symbol}</Text>
            </View>
            <PriceTarget
              data={{
                low: data.low,
                mean: data.mean,
                high: data.high,
                last_close: data.last_close,
              }}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainerStyle: {
    padding: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: '700',
    marginBottom: moderateScale(12),
  },
  input: {
    borderWidth: moderateScale(1),
    borderColor: '#ccc',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginBottom: moderateScale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
    backgroundColor: '#e6e5e5',
    gap: moderateScale(12),
  },
  logo: {
    width: moderateScale(34),
    height: moderateScale(34),
    borderRadius: moderateScale(8),
  },
  symbol: {
    fontSize: moderateScale(24),
    fontWeight: '700',
  },
  error: {
    color: 'red',
  },
});

export default App;
