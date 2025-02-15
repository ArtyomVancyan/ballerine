import { Badge } from '@/components/Badge';
import { Section } from '@/templates/report/components/Section';
import { IWebsiteCheck } from '@/templates/report/schema';
import { tw } from '@/theme';
import { Text, View } from '@react-pdf/renderer';
import { FunctionComponent } from 'react';

export interface WebsiteCheckProps {
  data: IWebsiteCheck;
}

export const WebsiteCheck: FunctionComponent<WebsiteCheckProps> = ({ data }) => {
  return (
    <>
      {data.map(websiteInfo => {
        const { website, riskLevel, riskScore = 0, indicators, riskAnalysis } = websiteInfo;
        const { lineOfBusiness, reputation, traffic, pricing } = riskAnalysis || {};

        return (
          <Section title={`${website} Website TL Check`} key={`website-check-key-${website}`}>
            <Section.Blocks>
              {riskLevel && (
                <Section.Blocks.Block>
                  <Section.Blocks.Block.Label text="General Risk Level" />
                  <Badge text={riskLevel} variant="error" />
                </Section.Blocks.Block>
              )}
              <Section.Blocks.Block>
                <Section.Blocks.Block.Label text="General Risk Score" />
                <Badge text={String(riskScore || 0)} variant="error" />
              </Section.Blocks.Block>
            </Section.Blocks>
            {indicators && !!indicators.length && (
              <Section.Indicators>
                <Section.Indicators.Title text="Indicators" />
                {indicators.map((indicator, index) => (
                  <Section.Indicators.Indicator text={indicator} key={`indicator-${index}`} />
                ))}
              </Section.Indicators>
            )}
            {lineOfBusiness && (
              <View style={tw('flex flex-col gap-8')}>
                <View style={tw('flex flex-row gap-16 w-full')}>
                  <View style={tw('w-[140px]')}>
                    <Section.Blocks.Block>
                      <Section.Blocks.Block.Label text="Line of business risk score" />
                      <Badge text={String(lineOfBusiness.riskScore)} variant="warning" />
                    </Section.Blocks.Block>
                  </View>
                  <Section.Blocks.Block>
                    <Section.Blocks.Block.Label text="Line of business risk summary" />
                    <View style={tw('overflow-hidden w-[300px]')}>
                      <Text style={tw('text-xs')}>{lineOfBusiness.summary}</Text>
                    </View>
                  </Section.Blocks.Block>
                </View>
              </View>
            )}
            {reputation && (
              <View style={tw('flex flex-col gap-8')}>
                <View style={tw('flex flex-row gap-16 w-full')}>
                  <View style={tw('w-[140px]')}>
                    <Section.Blocks.Block>
                      <Section.Blocks.Block.Label text="Reputation risk score" />
                      <Badge text={String(reputation.riskScore || 0)} variant="warning" />
                    </Section.Blocks.Block>
                  </View>
                  <Section.Blocks.Block>
                    <Section.Blocks.Block.Label text="Reputation risk summary" />
                    <View style={tw('overflow-hidden w-[300px] pr-10')}>
                      <Text style={tw('text-xs')}>{reputation.summary}</Text>
                    </View>
                  </Section.Blocks.Block>
                </View>
              </View>
            )}
            {traffic && (
              <View style={tw('flex flex-col gap-8')}>
                <View style={tw('flex flex-row gap-16 w-full')}>
                  <View style={tw('w-[140px]')}>
                    <Section.Blocks.Block>
                      <Section.Blocks.Block.Label text="Traffic risk score" />
                      <Badge text={String(traffic.riskScore || 0)} variant="warning" />
                    </Section.Blocks.Block>
                  </View>
                  <Section.Blocks.Block>
                    <Section.Blocks.Block.Label text="Traffic risk summary" />
                    <View style={tw('overflow-hidden w-[300px] pr-10')}>
                      <Text style={tw('text-xs')}>{traffic.summary}</Text>
                    </View>
                  </Section.Blocks.Block>
                </View>
              </View>
            )}
            {pricing && (
              <View style={tw('flex flex-col gap-8')}>
                <View style={tw('flex flex-row gap-16 w-full')}>
                  <View style={tw('w-[140px]')}>
                    <Section.Blocks.Block>
                      <Section.Blocks.Block.Label text="Pricing risk score" />
                      <Badge text={String(pricing.riskScore || 0)} variant="success" />
                    </Section.Blocks.Block>
                  </View>
                  <Section.Blocks.Block>
                    <Section.Blocks.Block.Label text="Pricing risk summary" />
                    <View style={tw('overflow-hidden w-[300px] pr-10')}>
                      <Text style={tw('text-xs')}>{pricing.summary}</Text>
                    </View>
                  </Section.Blocks.Block>
                </View>
              </View>
            )}
          </Section>
        );
      })}
    </>
  );
};
