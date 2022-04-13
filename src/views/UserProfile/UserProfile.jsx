import React from "react";
import { Grid, InputLabel } from "material-ui";

import {
  ProfileCard,
  RegularCard,
  Button,
  CustomInput,
  ItemGrid
} from "components";

import avatar from "assets/img/malabwhite.png";

function UserProfile({ ...props }) {
  return (
    <div>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={8}>
          <RegularCard
            cardTitle="تحديث الحساب الشخصي "
            cardSubtitle="  "
            content={
              <div>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="اسم الشركه"
                      id=""
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="اسم المستخدم"
                      id="username"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="الايميل "
                      id="email-address"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                </Grid>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="الاسم الاول "
                      id="first-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                  <ItemGrid xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="الاسم الثاني "
                      id="last-name"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>
                </Grid>
                <Grid container>
                  <ItemGrid xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="المدينه"
                      id="city"
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </ItemGrid>

                </Grid>

              </div>
            }
            footer={<Button color="primary"> تحديث البيانات</Button>}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={4}>
          <ProfileCard
            avatar={avatar}
            subtitle="حساب المسول"
            title="محمد عثمان "
            description="مطور ومبرمج التطبيق ولوحه التحكم"
            footer={
              <Button color="primary" round>
                تسجيل الخروج
              </Button>
            }
          />
        </ItemGrid>
      </Grid>
    </div>
  );
}

export default UserProfile;
